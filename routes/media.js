const express = require("express")
const {upload} = require('../utils')
const mediaModel = require("../models/media")
const  mediaRouter = express.Router()

mediaRouter.post("/",  upload.single("file"), async function (req, res) {
  const newPath = req.file.path.replace("public/", "/")
  const result = await mediaModel.create(
    {...req.file, path: newPath}
  )
  return res.json(
    result
  )
})

module.exports = mediaRouter

