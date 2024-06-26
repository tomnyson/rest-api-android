const express = require('express');
const userRoute = require('./user');
const categoryRoute = require('./category');
const productRoute = require('./product');
const mediaRouter = require('./media');
const apiRoute = express.Router();

const {authorizationJwt} = require('../middleware');
apiRoute.use('/user',(req, res, next) => {
    console.log('call user api route');
    next();
},authorizationJwt, userRoute);

apiRoute.use('/category',(req, res, next) => {
    next();
},authorizationJwt, categoryRoute);
apiRoute.use("/media", mediaRouter)
apiRoute.use('/product',authorizationJwt, productRoute);


// apiRoute.use('/', function (req, res) {
//     return res.json({'message': 'api working'})
// });
    
module.exports = apiRoute;
// API -> USER -> LOGIN -> REGISTER