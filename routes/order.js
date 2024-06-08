const express = require("express")
const orderRoute = express.Router()
const { saveOrder, getOrder, getOrderByUserId } = require("../controllers/order")

orderRoute.post("/", async function (req, res) {
    console.log("call post route")
  return saveOrder(req, res)
})


orderRoute.get("/", async function (req, res) {
  console.log("call post route 111 121313")
  return getOrder(req, res)
})

orderRoute.get("/:userId", async function (req, res) {
  console.log("call post route 111 121313")
  return getOrderByUserId(req, res)
})

// cartRoute.get("/", async function (req,res) {
//     return get(req, res)
// })

// cartRoute.get("/:id", async function (req,res) {
//   return getDetail(req, res)
// })
module.exports = orderRoute