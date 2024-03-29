const { hashPassword, comparePassword, generateToken } = require("../utils")
const UserModel = require("../models/user-schema")
async function createUser(req, res, next) {
  const { username, password, email } = req.body
  const hash_pass = await hashPassword(password)
  console.log(req.user)
  const created = await UserModel.create({
    username: username,
    password: hash_pass,
    email: email,
  })
  return res.json({ message: "dang ky thanh cong", data: created })
}

async function loginDashboard(req, res, next) {
    const username = req.body.username
    const password = req.body.password
    console.log(req.body)
    const user=await UserModel.findOne({ username: username})
    if(!user) {
        res.redirect('/dashboard')
    }
    else {
        console.log(user)
        const result = await comparePassword(password, user.password)
    if(result == true) {
      req.session.user =  {
        "username": username,
        "role": user.role
      }
      res.redirect('/dashboard')
    }
    else{
      res.redirect('/login')
    }
  }
}

async function loginUser(req, res, next) {
  const username = req.body.username
  const password = req.body.password
  console.log("info user, authenzation", req.user)
  const hash = '$2b$10$LDBqgK1RCzyK.wALkIRhFu584k.jvsG.SRLoSwNsH5zD86SNd7HVi'
   
  const user=await UserModel.findOne({ username: username,  }, {password: 0})
  if(!user) {
      return res.status(400).json({ message: "tai khoan hoac mat khau sai"})
  }
  else {
      const result = await comparePassword(password, hash)
  console.log(result)
  if(result == true) {
    /**
     * token: 
     */
      const token = generateToken({id: user._id, username: user.username})
      return res.json({message: "dang nhap thanh cong", data:user, token:token})
  }
  else{
      return res.status(400).json({ message: "tai khoan hoac mat khau sai"})
  }
}
}

async function logOut(req, res, next) {
  req.session.destroy( 
  )
  res.redirect('/login')
  
}
module.exports = {
  createUser,
  loginUser,
  loginDashboard,
  logOut
}
