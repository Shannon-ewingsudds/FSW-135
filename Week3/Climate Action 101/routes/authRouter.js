const express = require('express');
const authRouter = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

//Find all
authRouter.get("/users", (req, res, next) => {
    User.find((err, users) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(users);
    })
})

/
//Find one
authRouter.get('/:userID', (req, res, next) => {
    User.find({_id: req.params.userID}, (err, user) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(user);
    })
});

//Update User
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

//Delete User
authRouter.delete("/:userID", (req, res, next) => {
    User.findOneAndDelete({_id: req.params.userID}, (err, deletedUser) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(`Successfully deleted User ${deletedUser.username} from the database.`);
    })
});

module.exports = authRouter;