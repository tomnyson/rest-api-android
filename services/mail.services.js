
require('dotenv').config()
const nodemailer = require('nodemailer')

/**
 * 
 * EMAIL=tabletkindfire@gmail.com
PASS_EMAIL=lkbivmsskcnzpgmb
 */
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS_EMAIL,
  },
})

const sendMail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      html: text,
    }
    console.log(process.env.EMAIL)
    console.log(process.env.PASS_EMAIL)
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

module.exports = {
  sendMail: sendMail,
}