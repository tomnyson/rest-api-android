const mongoose = require('mongoose')
const {Schema} = mongoose;

const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    total:  Number,
    status: String,
    typePayment: String,
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number,
        price: Number,
    }],
    createAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Order', OrderSchema);