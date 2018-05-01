import * as mongoose from 'mongoose';

/**
 * Defines the business schema for the MongoDB database entries
 *
 * @type {mongoose.Schema}
 */
export const businessSchema = new mongoose.Schema({
    name: String,
    street: String,
    city: String,
    zip: String,
    state: String
});

const Business = mongoose.model('Business', businessSchema, 'Business');

export default Business;
