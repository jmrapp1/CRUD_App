import * as mongoose from 'mongoose';

export const appointmentSchema = new mongoose.Schema({
    date: String,
    service: { type: mongoose.Schema.Types.ObjectId, service: 'ServicesService' },
    client: { type: mongoose.Schema.Types.ObjectId, service: 'UserService' },
    employee: { type: mongoose.Schema.Types.ObjectId, service: 'EmployeeService' },
});

const Appointment = mongoose.model('Appointment', appointmentSchema, 'Appointment');

export default Appointment;
