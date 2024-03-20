const mongoose = require('mongoose')
const {Schema} = mongoose;

const categorySchema = new Schema({
    name: String,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Categories', categorySchema);