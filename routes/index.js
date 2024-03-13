const express = require('express');
const userRoute = require('./user');
const apiRoute = express.Router();
const authMiddleware = require('../middleware');
apiRoute.use('/user',(req, res, next) => {
    console.log('call user api route');
    next();
},authMiddleware, userRoute);


// apiRoute.use('/', function (req, res) {
//     return res.json({'message': 'api working'})
// });
    
module.exports = apiRoute;
// API -> USER -> LOGIN -> REGISTER