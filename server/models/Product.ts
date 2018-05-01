import * as mongoose from 'mongoose';

/**
 * Defines the product schema for the MongoDB database entries
 *
 * @type {mongoose.Schema}
 */
export const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    business: { type: mongoose.Schema.Types.ObjectId, ref: 'Business' }
});

const Product = mongoose.model('Product', productSchema, 'Product');

export default Product;
