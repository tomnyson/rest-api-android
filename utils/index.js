const bcrypt = require("bcrypt")
var jwt = require("jsonwebtoken")
const multer  = require('multer')
const { uid } = require('uid');
async function hashPassword(plaintextPassword) {
  const hash = await bcrypt.hash(plaintextPassword, 10)
  return hash
}

// compare password
async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash)
  return result
}

function generateToken(payload) {
    console.log("process.env.SECRET_KEY",process.env.SECRET_KEY)
const token = jwt.sign({data: {
...payload
}}, process.env.SECRET_KEY, { expiresIn: process.env.EXPIRE_TIME })
  return token
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      
      cb(null, 'public/uploads/'); //hỉnh ảnh sẽ chưa trong folder uploads
     
  },
  filename: (req, file, cb) => {
      console.log(file)
      const id = uid()
      cb(null ,  `${id}-${file.originalname}`); ;// mặc định sẽ save name của hình ảnh
      // là name gốc, chúng ta có thể rename nó.  
  }
})

const upload = multer({storage:storage});

const generateOTP = () => { 
  
  // Declare a digits variable  
  // which stores all digits  
  let digits =  
'0123456789'; 
  let OTP = ''; 
  let len = digits.length 
  for (let i = 0; i < 6; i++) { 
      OTP += digits[Math.floor(Math.random() * len)]; 
  } 
  return OTP; 
} 

module.exports = {
  hashPassword,
  comparePassword,
  generateToken,
  upload,
  generateOTP
}
