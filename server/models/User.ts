import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true, trim: true },
    firstName: String,
    lastName: String,
    phone: String,
    password: String,
    role: {
        type: String,
        enum: ['USER', 'EMPLOYEE', 'MANAGER'],
        default: 'USER'
    }
});

/** Additional data will be appended to user schema based on role **/
/**
 * ROLE: USER
 *      profile: {
 *      }
 *
 * ROLE: EMPLOYEE
 *      profile: {
 *          payRate: Number,
            daysWorking: {
                monday: Boolean,
                tuesday: Boolean,
                wednesday: Boolean,
                thursday: Boolean,
                friday: Boolean,
                saturday: Boolean,
                sunday: Boolean
            }
 *      }
 * ROLE: MANAGER
 *      profile: {
            daysWorking: {
                monday: Boolean,
                tuesday: Boolean,
                wednesday: Boolean,
                thursday: Boolean,
                friday: Boolean,
                saturday: Boolean,
                sunday: Boolean
            }
 *      }
 */

// Before saving the user, hash the password
userSchema.pre('save', next => {
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
        bcrypt.genSalt(10, (err, salt) => {
            if (err) {
                return reject(err);
            }
            bcrypt.hash(password, salt, (error, hash) => {
                if (error) {
                    return reject(error);
                }
                resolve(hash);
            });
        });
    });
}

userSchema.methods.comparePassword = async (candidatePassword) => {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Omit the password when returning a user
userSchema.set('toJSON', {
    transform: (doc, ret, options) => {
        delete ret.password;
        return ret;
    }
});

const User = mongoose.model('User', userSchema, 'User');

export default User;
