const express = require('express')
const movieRouter = express.Router()
const uuid = require('uuidv4')

const movies = [
	{title: "die hard", genre: "action", _id: uuid()}, 
	{title: "star wars IV", genre: "fantasy", _id: uuid()},
	{title: "lion king", genre: "fantasy", _id: uuid()},
	{title: "friday the 13th", genre: "horror", _id: uuid()},
]

//Get All
movieRouter.get("/", (req, res, next) =>{
	return res.status(200).send(movies)
})

//Post One
movieRouter.post("/", (req, res, next) =>{
	const newMovie = req.body
	newMovie._id = uuid()
	movies.push(newMovie)
	return res.status(201).send(newMovie)
})

//Get Oone
movieRouter.get("/movieId", (req, res, next) =>{
	const movieId = req.params.movieId
	const foundMovie = movies.find(movie => movie._id === movieId)
	if(foundMovie){
		const error = new Error (`the item with id ${movieId} was not found.`)
		res.status(500)
		return next(error)
	}
	return res.status(200).send(foundMovie)
})

//Get by genre
movieRouter.get("/search/genre", (req, res, next) =>{
	const genre = req.query.genre
	if(!genre){
		const error = new Error("You must provide a genre")
		res.status(500)
		return next(error)
	}
	const filterMovies = movies.filter(movie => movie.genre ===genre)
	return res.status(200).send(filterMovies)
})