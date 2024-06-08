const productModel = require("../models/product")
const categoryModel = require("../models/category")
const userModel = require("../models/user-schema")
const cartModel = require("../models/cart");

const orderModel = require("../models/order");
const ObjectId = require('mongoose').Types.ObjectId;

async function create(req, res, next) {
  const { userId, items } = req.body
  /**
   * find categoryModel kem category _id
   * if return null or undefined => status 400
   */
  try {
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({message: 'userId inValid'});
    }
    const userExist = await userModel.findOne({ _id: userId })
    if(!userExist) {
      return res.status(400).json({message: 'userId not found'});
    }
    
    const created = await cartModel.findOneAndUpdate({
     userId
    },{
      items,
    },{upsert:true})
    return res.json({ message: "tao product thanh cong", data: created })
  } catch(err) {
    console.error(err)
    return res.status(400).json({ err  });
  }
}

async function saveOrder(req, res, next) {
  const { userId, items,status,typePayment } = req.body
  console.log(JSON.stringify(req.body))
  try {
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({message: 'userId inValid'});
    }
    const userExist = await userModel.findOne({ _id: userId })
    if(!userExist) {
      return res.status(400).json({message: 'userId not found'});
    }
    
    const created = await orderModel.findOneAndUpdate({
     userId
    },{
      items,status,typePayment
    },{upsert:true})
    return res.json({ message: "thanh cong", data: created })
  } catch(err) {
    console.error(err)
    return res.status(400).json({ err  });
  }
}
async function get(req, res, next) {

  const product = await productModel.find().populate('category', '-__v')
  return res.json(product)
}

async function getDetail(req, res, next) {
  const {id} = req.params
  const product = await productModel.find({_id: id}).populate('category', '-__v')
  if(!product) {
    return res.status(400).json({message: 'Product not found'});
  }

  return res.json(product[0])
}


module.exports = {
  create: create,
  get: get,
  getDetail: getDetail,
  saveOrder:saveOrder
}
