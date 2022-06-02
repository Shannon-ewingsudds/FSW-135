const express = require('express');
const userRouter = express.Router();
const User = require('../models/User');



//Find all
userRouter.get('/', (req, res, next) => {
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
userRouter.get('/:userID', (req, res, next) => {
    User.findOne({_id: req.params.userID}, (err, userOne) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(userOne);
    })
});
//Post one
userRouter.post("/", (req, res, next) => {
    const newUser = new User(req.body);
    newUser.save((err, savedUser) => {
        if(err) {
            res.status(500)
            return next(err)
        }
        return res.status(201).send(savedUser)
    })
});
//Update User
userRouter.put("/:userID", (req, res, next) => {
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
userRouter.delete("/:userID", (req, res, next) => {
    User.findOneAndDelete({_id: req.params.userID}, (err, deletedUser) => {
        if(err) {
            res.status(500);
            return next(err);
        }
        return res.status(200).send(`Successfully deleted User ${deletedUser.username} from the database.`);
    })
});

module.exports = userRouter;