import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

export const UserRoles = { CUSTOMER: 'CUSTOMER', EMPLOYEE: 'EMPLOYEE', MANAGER: 'MANAGER', ADMIN: 'ADMIN' };

/**
 * Defines the user schema for the MongoDB database entries
 * Additional data will be appended to user schema based on role
 *
 * ROLE: CUSTOMER
 *      profile: {
 *      }
 *
 * ROLE: EMPLOYEE
 *      profile: {
 *          payRate: Number,
 *          daysWorking: {
 *              monday: Boolean,
 *              tuesday: Boolean,
 *              wednesday: Boolean,
 *              thursday: Boolean,
 *              friday: Boolean,
 *              saturday: Boolean,
 *              sunday: Boolean
 *          }
 *      }
 * ROLE: MANAGER
 *      profile: {
 *          daysWorking: {
 *              monday: Boolean,
 *              tuesday: Boolean,
 *              wednesday: Boolean,
 *              thursday: Boolean,
 *              friday: Boolean,
 *              saturday: Boolean,
 *              sunday: Boolean
 *          }
 *      }
 * @type {mongoose.Schema}
 */
export const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true, trim: true },
    firstName: String,
    lastName: String,
    phone: String,
    password: String,
    role: {
        type: String,
        enum: [ UserRoles.CUSTOMER, UserRoles.EMPLOYEE, UserRoles.MANAGER ],
        default: UserRoles.CUSTOMER
    },
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' },
    profile: {}
});

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    hashPassword(user.password).then(hash => {
        user.password = hash;
        next();
    }, err => {
        return next(err);
    });
});

export function hashPassword(password) {
    return new Promise<String>((resolve, reject) => {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(password, salt, function (error, hash) {
                if (error) {
                    return reject(error);
                }
                resolve(hash);
            });
        });
    });
}

userSchema.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

// Omit the password when returning a user
userSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        delete ret.password;
        return ret;
    }
});
const User = mongoose.model('User', userSchema, 'User');

export default User;
