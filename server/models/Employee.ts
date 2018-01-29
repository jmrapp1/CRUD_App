import * as mongoose from 'mongoose';

export const employeeSchema = new mongoose.Schema({
    email: { type: String, unique: true, lowercase: true, trim: true, },
    firstName: String,
    lastName: String,
    phone: String,
    password: String,
    payRate: Number,
    daysWorking: {
        monday: Boolean,
        tuesday: Boolean,
        wednesday: Boolean,
        thursday: Boolean,
        friday: Boolean,
        saturday: Boolean,
        sunday: Boolean
    }
});

const Employee = mongoose.model('Employee', employeeSchema, 'Employee');

export default Employee;
