const mongoose = require('mongoose')
const {Schema} = mongoose;

const Media = new Schema({
    path: String,
    originalname: String,
    size: Number,
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Media', Media);