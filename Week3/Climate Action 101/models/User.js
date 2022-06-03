const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String, 
    }, 
    password: {
        type: String, 
    }, 
    memberSince: {
        type: Date, 
        default: Date.now
    }, 
    isAdmin: {
        type: Boolean, 
        default: false
    }
})

module.exports = mongoose.model("Users", userSchema);