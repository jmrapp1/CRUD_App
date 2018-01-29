import * as mongoose from 'mongoose';

export const saleSchema = new mongoose.Schema({
    date: String,
    quantity: Number,
    price: Number,
    product: { type: mongoose.Schema.Types.ObjectId, service: 'ProductService' },
    buyer: { type: mongoose.Schema.Types.ObjectId, service: 'UserService' },
    seller: { type: mongoose.Schema.Types.ObjectId, service: 'EmployeeService' },
});

const Sale = mongoose.model('Sale', saleSchema, 'Sale');

export default Sale;
