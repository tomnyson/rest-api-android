const express = require('express');
const userRoute = require('./user');
const categoryRoute = require('./category');
const productRoute = require('./product');
const cartRoute = require('./cart');
const mediaRouter = require('./media');
const orderRouter = require('./order');
const apiRoute = express.Router();

const {authorizationJwt} = require('../middleware');
apiRoute.use('/user',(req, res, next) => {
    console.log('call user api route');
    next();
}, userRoute);

apiRoute.use('/category',(req, res, next) => {
    next();
},authorizationJwt, categoryRoute);
apiRoute.use("/media", mediaRouter)
apiRoute.use('/product', productRoute);
apiRoute.use('/cart', cartRoute);
apiRoute.use('/order', orderRouter);


// apiRoute.use('/', function (req, res) {
//     return res.json({'message': 'api working'})
// });
    
module.exports = apiRoute;
// API -> USER -> LOGIN -> REGISTER