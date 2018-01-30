import * as mongoose from 'mongoose';

export const testSchema = new mongoose.Schema({
    test: { type: String, unique: true }
});

const Test = mongoose.model('Test', testSchema, 'Test');

export default Test;
