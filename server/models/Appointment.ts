import * as mongoose from 'mongoose';

export const appointmentSchema = new mongoose.Schema({
    date: String,
    service: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' }
});

const Appointment = mongoose.model('Appointment', appointmentSchema, 'Appointment');

export default Appointment;
