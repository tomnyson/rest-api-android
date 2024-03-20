const mongoose = require('mongoose')
const {Schema} = mongoose;

const ProductSchema = new Schema({
    name:  String,
    description: String,
    images: [String],
    price: Number,
    category: { type: Schema.Types.ObjectId, ref: 'Categories' },
    createAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model('Product', ProductSchema);