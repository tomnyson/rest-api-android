const express = require('express')
const apiRoute = require('./routes');
const userSchema = require('./models/user-schema');
require('dotenv').config()
require('./models/mongo-provider')
const session = require('express-session');
const {authMiddlewareView} = require('./middleware')
const {loginDashboard, logOut} = require('./controllers/user')
const app = express()
const admin = require('firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// use session
app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: process.env.SECRET_KEY, 
  cookie: { maxAge: 60000 }}));

// set view and static for admin
app.use(express.static('public'))
app.set('view engine', 'ejs');

// middleware application routes

app.use((req, res, next) => {
  // console.log('Log system:', process.env)
  next()
})

app.get('/', function (req, res) {
    res.send('Api is running')
  })
  
app.use('/api', apiRoute)

// router view user admin

app.get('/dashboard',authMiddlewareView, async function (req, res){
  // render form
  const users = await userSchema.find()
  res.render('dashboard/index',{users: users});
})

app.get('/login', async function (req, res){
  // render form
  const users = await userSchema.find()
  res.render('dashboard/login',{users: users});
})


app.get('/login-sso', async function (req, res){
  // render form
  const users = await userSchema.find()
  res.render('dashboard/login-sso',{users: users});
})

app.get('/register-sso', async function (req, res){
  // render form
  const users = await userSchema.find()
  res.render('dashboard/register-sso',{users: users});
})


app.post('/register-sso', async function (req, res){
  // render form
  const {email, password} = req.body
  try {
    const user = await admin.auth().createUser({
      email,
      password,
    });
    res.status(201).send(`User ${user.uid} created successfully!`);
  } catch (error) {
    console.log(error)
    res.status(500).send('Error creating user');
  }
})


app.post('/dashboard/login', async function (req, res){
  // render form
  return loginDashboard(req, res)
})

app.get('/logout', async function (req, res){
  // render form
  return logOut(req, res)
})

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