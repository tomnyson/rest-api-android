const productModel = require('../models/product')
const categoryModel = require('../models/category')
const userModel = require('../models/user-schema')
const cartModel = require('../models/cart')

const orderModel = require('../models/order')
const ObjectId = require('mongoose').Types.ObjectId

async function getOrder(req, res, next) {
  try {
    console.log('call order list request ')
    const order = await orderModel.find().populate('userId').populate('items.productId')
  
    return res.json(order)
  }catch (err) {
    console.log(err)
    return res.status(400)({err: "wrong order"})
  }

}

async function getOrderByUserId(req, res, next) {
  try {
    const {userId} = req.params
    console.log('call order list request ')
    const order = await orderModel.find({userId}).populate('userId').populate('items.productId')
  
    return res.json(order)
  }catch (err) {
    console.log(err)
    return res.status(400)({err: "wrong order"})
  }

}

async function create(req, res, next) {
  const { userId, items } = req.body
  /**
   * find categoryModel kem category _id
   * if return null or undefined => status 400
   */
  try {
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'userId inValid' })
    }
    const userExist = await userModel.findOne({ _id: userId })
    if (!userExist) {
      return res.status(400).json({ message: 'userId not found' })
    }

    const created = await cartModel.findOneAndUpdate(
      {
        userId,
      },
      {
        items,
      },
      { upsert: true },
    )
    return res.json({ message: 'tao product thanh cong', data: created })
  } catch (err) {
    console.error(err)
    return res.status(400).json({ err })
  }
}

async function saveOrder(req, res, next) {
  const { userId, items, status, typePayment, total } = req.body
  console.log(JSON.stringify(req.body))
  try {
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'userId inValid' })
    }
    const userExist = await userModel.findOne({ _id: userId })
    if (!userExist) {
      return res.status(400).json({ message: 'userId not found' })
    }

    const created = await orderModel.findOneAndUpdate(
      {
        userId,
      },
      {
        items,
        status,
        typePayment,
        total,
      },
      { upsert: true },
    )
    return res.json({ message: 'thanh cong', data: created })
  } catch (err) {
    console.error(err)
    return res.status(400).json({ err })
  }
}

module.exports = {
  create: create,
  getOrder: getOrder,
  saveOrder: saveOrder,
  getOrderByUserId: getOrderByUserId
}
