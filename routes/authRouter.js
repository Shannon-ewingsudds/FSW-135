const express = require('express')
const authRouter = express.Router()
const User = require('../models/user.js')
const jwt = require('jsonwebtoken')

// Signup
authRouter.post("/signup", (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        if(user) {
            res.status(403)
            return next(new Error("That username is already taken!"))

        }
        const newUser = new User(req.body);
        newUser.save((err, savedUser) => {
            if(err) {
                res.status(500)
                return next(err)
            }
            const token = jwt.sign(savedUser.toObject(), secret);
            return res.status(201).send({token, user: savedUser});
        })
    })
})


// Login
authRouter.post("/login", (req, res, next) => {
    User.findOne({username: req.body.username.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        if(!user) {
            res.status(403)
            return next(new Error("User does not exist!"))
        }
        if(req.body.password !== user.password) {
            res.status(403)
            return next(new Error("Username or Password are incorrect!"))
        }
        const token = jwt.sign(user.toObject(), `${process.env.JWT_SECRET_KEY}`);
        return res.status(200).send({token, user});
    })
})


//get all
authRouter.get('/', (req, res, next) => {
    User.find((err, inventories) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(inventories);
    })
});

//get one
authRouter.get('/:userID', (req, res, next) => {
    User.findOne({_id: req.params.userID}, (err, userOne) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(userOne)
    })
});

//post one
authRouter.post("/", (req, res, next) => {
    const newUser = new User(req.body);
    newUser.save((err, savedUser) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedUser)
    })
});

//delete one
authRouter.delete("/:userID", (req, res, next) => {
    User.findOneAndDelete({_id: req.params.userID}, (err, deletedUser) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(`Successfully deleted user ${deletedUser.title} from the database.`);
    })
});

//update one
authRouter.put("/:userID", (req, res, next) => {
    User.findOneAndUpdate(
        {_id: req.params.userID},
        req.body,
        {new: true},
        (err, updatedUser) => {
            if(err) {
                res.status(500);
                return next(err);
            }
            return res.status(201).send(updatedUser)
        }
    )
});
module.exports = authRouter;