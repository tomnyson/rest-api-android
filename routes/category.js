const express = require("express")
const categoryRouter = express.Router()

const UserModel = require("../models/user-schema")
const userSchema = require("../models/user-schema")

const { createCategory } = require('../controllers/category')
categoryRouter.post("/", async function (req, res) {
  return createCategory(req, res)
})

module.exports = categoryRouter

