const { hashPassword, comparePassword, generateToken } = require("../utils")
const categoryModel = require("../models/category")
async function createCategory(req, res, next) {
  const { name, } = req.body
  console.log(req.user)
  const created = await categoryModel.create({
    name: name,
  })
  return res.json({ message: "dang ky thanh cong", data: created })
}


module.exports = {
  createCategory,
}
