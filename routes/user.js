const express = require("express")
const userRoute = express.Router()
const UserModel = require("../models/user-schema")
const userSchema = require("../models/user-schema")
const accounts = [
  { username: "admin", password: "123456" },
  { username: "user", password: "123456" },
  { username: "qoqzrl", password: "b929mpcr" },
  { username: "xhsonk", password: "yhf7aw23" },
  { username: "ivzfqw", password: "zgofwozp" },
  { username: "hhtuyr", password: "8eyzpb3i" },
  { username: "jxlaol", password: "nqr5qiim" },
  { username: "cvypof", password: "qb8nktg2" },
  { username: "lwksvm", password: "cc4s2vk9" },
  { username: "qtufew", password: "oumwyl2s" },
]

userRoute.get("/", async function (req, res) {
  const keyWord = req.query.keyWord
  const { page = 1, limit = 2 } = req.query

  // tim ten den tu query string
  let condition = {}
  if (keyWord && keyWord.length > 0) {
    condition.username = { $regex: keyWord, $options: "i" }
  }

  // pagination
  const userlists = await UserModel.find(condition)
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec()

  const count = await UserModel.countDocuments(condition)

  return res.json({
    userlists,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
  })
})

/**
 *  body {
 * username, password => user admin pass: 123456}
 */

userRoute.post("/login", function (req, res) {
  const username = req.body.username
  const password = req.body.password
  for (let i = 0; i < accounts.length; i) {
    if (username === accounts[i].username || password === accounts[i].password) {
      res.json({ message: "dang nhap thanh cong" })
    } else {
      res.json({ message: "Loi" })
    }
  }
})
userRoute.post("/register", async function (req, res) {
  const { username, password, email } = req.body
  const created = await UserModel.create({ username: username, password: password, email: email })
  return res.json({ message: "dang ky thanh cong", data: created })
})

/**
 * update password
 * nhap vao mat khau cu neu dung thi cap nhat
//  * old_pass
 * new_pass
 */
userRoute.put("/:userID", async function (req, res) {
  const { userID } = req.params
  const { username, password } = req.body
  const updateData = { username, password }
  console.log(userID)
  await UserModel.findOneAndUpdate({ _id: userID }, updateData)

  return res.json("Da update")
})
userRoute.delete("/:userId", async function (req, res) {
  const { userId } = req.params
  await userSchema.deleteOne({ _id: userId })
  return res.status(200).json({ mesage: "xóa thành công " })
})
module.exports = userRoute
