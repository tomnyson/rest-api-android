const { hashPassword, comparePassword, generateToken, generateOTP } = require("../utils")
const UserModel = require("../models/user-schema")
const mailServices = require("../services/mail.services")
const ejs = require('ejs');
const path = require('path');
async function createUser(req, res, next) {
  const { username, password, email } = req.body
  const hash_pass = await hashPassword(password)
  console.log(req.user)
  const isExistEmail = await UserModel.findOne({ email: email})
  console.log(isExistEmail)
  if(isExistEmail) {
    return res.status(400).json({ message: "email already exists"})
  }
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

async function forgotUser(req, res, next) {
  const email = req.body.email
  const user= await UserModel.findOne({ email: email})
  if(!user) {
    return res.status(400).json({ message: "tai khoan ko tồn tại"})
  }

  const otp = generateOTP()
  await UserModel.findOneAndUpdate({email},{otp})
  const templatePath = path.join(__dirname, '../views/email-templates/forgot.html')
  const htmlContent = await ejs.renderFile(templatePath, {otp: otp, email: email});
  await mailServices.sendMail(email, 'otp reset password', htmlContent)
  return res.json({message: `${otp}`})


}
async function updatePasswordWithOtpuUser(req, res, next) {
  const checkotp = req.body.otp
  const password=req.body.password

  const user= await UserModel.findOne({ otp: checkotp })

  if(!user) {
    return res.status(400).json({ message: "khong tim thay OTP"})
  }
  
  const hash_pass = await hashPassword(password)
  const doimk=await UserModel.findOneAndUpdate({email: user.email},{password:hash_pass})
  return res.json({message: "doi mat khau thanh cong",data:doimk})


}
module.exports = {
  createUser,
  loginUser,
  loginDashboard,
  logOut,
  forgotUser,
  updatePasswordWithOtpuUser
}
