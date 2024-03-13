const express = require("express")
const userRoute = express.Router()
const UserModel = require('../models/user-schema')
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

userRoute.get("/", function (req, res) {
  return res.json(accounts)
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
  await UserModel.create({ username: username, password: password, email: email })
  return res.json({ message: "dang ky thanh cong" })
})

/**
 * update password
 * nhap vao mat khau cu neu dung thi cap nhat
//  * old_pass
 * new_pass
 */
userRoute.put("/:username", function (req, res) {
  const { username } = req.params
  const { password } = req.body
  const userIndex = accounts.findIndex((account) => account.username === username)
  if (userIndex > -1) {
    accounts[userIndex].password = password
    return res.status(200).json({mesage: "cap nhat password thanh cong"})
  } else {
    return res.status(400).json({mesage: "cap nhat password ko thanh cong"})
  }
})
module.exports = userRoute
