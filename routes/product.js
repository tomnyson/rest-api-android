const express = require("express")
const productRouter = express.Router()
const { create } = require("../controllers/product")
const { get } = require("../controllers/product")

productRouter.post("/", async function (req, res) {
    console.log("call post route")
  return create(req, res)
})

productRouter.get("/show", async function (req,res) {
    return get(req, res)
})
module.exports = productRouter