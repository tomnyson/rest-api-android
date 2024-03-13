const express = require('express')
const apiRoute = require('./routes');
require('dotenv').config()
require('./models/mongo-provider')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// middleware application routes

app.use((req, res, next) => {
  // console.log('Log system:', process.env)
  next()
})

app.get('/', function (req, res) {
    res.send('Api is running')
  })
  
app.use('/api', apiRoute)

// app.get('/api/current-time', function (req, res) {
//     const currentTime = new Date();
//     res.json({
//         data: currentTime
//     })

// })


// app.post('/api/welcome', function (req, res) {
//     console.log(req.body);
//     res.json({
//         message: "Xin chào"
//     })

// })
// /**
//  *  ten, tuoi
//  *  goitinh
//  *  kt xem đủ điều kiện để kết hôn hay không ? nam 20, nu 18
//  */
// app.post('/api/check-ket-hon', function (req,res) {
//     const { name, sex, old } = req.body;
//     console.log(name, sex, old);
//     return res.json({
//         message: "Xin chào"
//     })
// })


app.get('/api*', function (req, res) {
    return res.json({'message': 'api not found'})
  })


app.listen(3000);