const mongoose = require("mongoose")
const Schema = mongoose.Schema

//Movie Schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    release_year: {
        type: Number,
        required: true,
        min: 1874
    }
})

module.exports = mongoose.model('Movie', movieSchema)

