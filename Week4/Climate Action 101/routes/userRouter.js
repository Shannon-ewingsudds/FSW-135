const express = require('express')
const userRouter = express.Router()
const User = require('../models/user.js')


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