import * as mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number
});

const Product = mongoose.model('Product', productSchema, 'Product');

export default Product;
