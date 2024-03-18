const { hashPassword, comparePassword } = require("../utils")
const UserModel = require("../models/user-schema")
async function createUser(req, res, next) {
  const { username, password, email } = req.body
  const hash_pass = await hashPassword(password)

  const created = await UserModel.create({
    username: username,
    password: hash_pass,
    email: email,
  })
  return res.json({ message: "dang ky thanh cong", data: created })
}

async function loginUser(req, res, next) {
    const username = req.body.username
    const password = req.body.password
    const hash = '$2b$10$LDBqgK1RCzyK.wALkIRhFu584k.jvsG.SRLoSwNsH5zD86SNd7HVi'
     
    const user=await UserModel.findOne({ username: username,  })
    if(!user) {
        return res.status(400).json({ message: "tai khoan hoac mat khau sai"})
    }
    else {
        const result = await comparePassword(password, hash)
    console.log(result)
    if(result==true) {
        return res.json({message: "dang nhap thanh cong", data:user})
    }
    else{
        return res.status(400).json({ message: "tai khoan hoac mat khau sai"})
    }
}
}
module.exports = {
  createUser,
  loginUser
}
