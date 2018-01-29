import * as mongoose from 'mongoose';

export const serviceSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String
});

const Service = mongoose.model('Service', serviceSchema, 'Service');

export default Service;
