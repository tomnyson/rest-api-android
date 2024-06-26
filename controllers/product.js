const productModel = require("../models/product")
const categoryModel = require("../models/category")
const ObjectId = require('mongoose').Types.ObjectId;

async function create(req, res, next) {
  const { category } = req.body
  /**
   * find categoryModel kem category _id
   * if return null or undefined => status 400
   */
  try {
    if (ObjectId.isValid(category)) {
      return res.status(400).json({message: 'Category isValid'});
    }
    const categoryExists = await categoryModel.findOne({ _id: category })
    if(!categoryExists) {
      return res.status(400).json({message: 'Category not found'});
    }
    const created = await productModel.create(req.body)
    return res.json({ message: "tao product thanh cong", data: created })
  } catch(err) {
    return res.status(400).json({ err  });
  }
}


async function get(req, res, next) {

  const product = await productModel.find().populate('category', '-__v')
  return res.json({ message: product})
}


module.exports = {
  create: create,
  get: get
}
