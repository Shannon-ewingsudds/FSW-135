const express = require("express");
const app = express();
const mongoose = require('mongoose');
const morgan = require("morgan");
require('dotenv').config();
const expressJwt = require('express-jwt');



const PORT = 9000;

//middleware
app.use(express.json());
app.use(morgan('dev'));

//connect to DB

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/UserSchema', {family: 4});
  console.log("Connected to MongoDB");
}

//Routes
app.use('/api', expressJwt({ secret: process.env.SECRET, algorithms: ['HS256'] }));
app.use('/auth', require('./routes/authRouter.js'));
app.use('/api/users', require('./routes/userRouter.js'));
app.use('/api/issues', require('./routes/issueRouter.js'));
app.use('/api/comments', require('./routes/commentRouter.js'));


//global error-handler
app.use((err, req, res, next) => {
    console.log(err);
    if(err.name === "UnauthorizedError") {
      res.status(err.status);
    }
    return res.send({errMsg: err.message});
})

//basic start-up logic
app.listen(PORT, () => {
    console.log(`Listening on Port ${PORT}...`);
});