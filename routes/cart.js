const express = require("express")
const cartRoute = express.Router()
const { create, getCartByUserId } = require("../controllers/cart")

cartRoute.post("/", async function (req, res) {
    console.log("call post route")
  return create(req, res)
})

cartRoute.get("/:userId", async function (req,res) {
    return getCartByUserId(req, res)
})

// cartRoute.get("/:id", async function (req,res) {
//   return getDetail(req, res)
// })
module.exports = cartRoute