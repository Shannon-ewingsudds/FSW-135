const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt } = require('express-jwt')

//Middleware
app.use(express.json())
app.use(morgan('dev'))

main().catch(err => console.log(err));

//Connect to Databases
mongoose.connect(
  'mongodb://localhost:27017/user-authentication',
  () => console.log('Connected to the DB')
)
async function main() {
  await mongoose.connect('mongodb://localhost:27017/userSchema', {family: 4});
  console.log("Connected to MongoDB");
}

//Routes
app.use('/auth', require('./routes/authRouter.js'))
app.use('/api', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256']})) // req.user
app.use('/api/todo', require('./routes/todoRouter.js'))

//Error Handler
app.use((err, req, res, next) => {
  console.log(err)
  if(err.name === "UnauthorizedError"){
    res.status(err.status)
  }
  return res.send({errMsg: err.message})
})

//Startup
app.listen(9000, () => {
  console.log(`Server is running on local port 9000`)
})