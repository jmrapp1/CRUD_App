import * as mongoose from 'mongoose';

/**
 * Defines the service schema for the MongoDB database entries
 *
 * @type {mongoose.Schema}
 */
export const serviceSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' }
});

const Service = mongoose.model('Service', serviceSchema, 'Service');

export default Service;
