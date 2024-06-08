const mongoose = require('mongoose')
const {Schema} = mongoose;

const CartSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'Users' },
    items: [{
             productId: {type: Schema.Types.ObjectId, ref: 'Product'},
             quantity: Number
    }],
    createAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Cart', CartSchema);