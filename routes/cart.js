const express = require("express")
const cartRoute = express.Router()
const { create } = require("../controllers/cart")

cartRoute.post("/", async function (req, res) {
    console.log("call post route")
  return create(req, res)
})

// cartRoute.get("/", async function (req,res) {
//     return get(req, res)
// })

// cartRoute.get("/:id", async function (req,res) {
//   return getDetail(req, res)
// })
module.exports = cartRoute