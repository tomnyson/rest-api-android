const express = require("express")
const productRouter = express.Router()
const { create } = require("../controllers/product")
const { get, getDetail } = require("../controllers/product")

productRouter.post("/", async function (req, res) {
    console.log("call post route")
  return create(req, res)
})

productRouter.get("/", async function (req,res) {
    return get(req, res)
})

productRouter.get("/:id", async function (req,res) {
  return getDetail(req, res)
})
module.exports = productRouter