const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

// Signup
authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(user){
      res.status(403)
      return next(new Error("That username is already taken"))
    }
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
                            // payload,            // secret
      const token = jwt.sign(savedUser.withoutPassword(), process.env.SECRET)
      return res.status(201).send({ token, user: savedUser.withoutPassword() })
    })
  })
})

// Login
authRouter.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(!user){
      res.status(403)
      return next(new Error("Username or Password are incorrect"))
    }
    
    user.checkPassword(req.body.password, (err, isMatch) => {
      if(err){
        res.status(403)
        return next(new Error("Username or Password are incorrect"))
      }
      if(!isMatch){
        res.status(403)
        return next(new Error("Username or Password are incorrect"))
      }
      const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
      return res.status(200).send({ token, user: user.withoutPassword() })
    })
  })
})
//Get All Users
authRouter.get('/users',function(req, res) {
  User.find({}, function(err, result) {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
});

//Get One User
authRouter.get('/:userID', (req, res, next) => {
  User.find({_id: req.params.userID}, (err, user) => {
      if(err) {
          res.status(500);
          return next(err);
      }
      return res.status(200).send(user);
  })
});

//Update one User
authRouter.put('/Update/:id',function(req, res) {
  User.findOneAndUpdate({id:req.params.id},req.body,{new:true},(err,updateditem) => {
  if (err) {
    res.send(err);
  } else {
    res.send(updateditem);
  }
});
});

//Delete One User
authRouter.delete('/Delete/:id',function(req, res) {
  User.findOneAndDelete(
      {id: req.params.id}, 
      (err, deletedItem) => {
        if(err){
          res.status(500)
          return next(err)
        }
        return res.status(200).send(`Successfully deleted item ${deletedItem.body} from the database`)
      }
    )
  
});


module.exports = authRouter