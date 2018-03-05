import * as mongoose from 'mongoose';

export const businessSchema = new mongoose.Schema({
    name: String,
    street: String,
    city: String,
    zip: String,
    state: String
});

const Business = mongoose.model('Business', businessSchema, 'Business');

export default Business;
