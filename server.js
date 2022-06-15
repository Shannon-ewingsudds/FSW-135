const express = require("express");
const app = express();
require('dotenv').config();
const morgan = require("morgan");
const mongoose = require("mongoose");
const expressJwt = require('express-jwt');

// Middleware (for every request) //
app.use(express.json());
app.use(morgan("dev"));

//Connection to Database
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/UserSchema', {family: 4});
  console.log("Connected to MongoDB");
}

//Routes
app.use('/auth', require('./routes/authRouter.js'));

app.use('/api/user', require('./routes/userRouter.js'));
app.use('/api/issues', require('./routes/issueRouter.js'));
app.use('/api/comments', require('./routes/commentRouter.js'));
app.use('/api/todo', require('./routes/todoRouter.js'));


//Error Handler
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  } else {
    next(err);
  }
  return res.send({errMsg: err.message})
});

// Server Listen //

//Listener
app.listen(9000, () => {
  console.log('This server is running on Port 9000')
})