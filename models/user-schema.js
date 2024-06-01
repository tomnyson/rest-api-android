const mongoose = require('mongoose')
const {Schema} = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    otp: String,
});

module.exports = mongoose.model('Users', userSchema);