const express = require('express')
const bookRouter = express.Router()
const Book = require('../models/book.js')

// Get All
bookRouter.get('/', (req, res, next) => {
  Book.find((err, books) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(books)
  })
})

// Add new book
bookRouter.post('/', (req, res, next) => {
  const newBook = new Book(req.body)
  newBook.save((err, savedBook) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(201).send(savedBook)
  })
})

//Get by Author
bookRouter.get('/:authorID', (req, res, next) => {
  Bookfind({author: req.params.authorID}, (err, books) => {
    if(err){
      res.status(500)
      return next(err)
    }
    return res.status(200).send(books)
  })
})

//Like a book
bookRouter.put('/like/:bookID', (req, res, next) => {
  Book.findOneAndUpdate(
    { _id: req.params.bookID },
    { $inc: { likes: 1 }},
    { new: true },
    (err, updatedBook) => {
      if(err) {
        res.status(500)
        return next(err)
      }
      return res.status(201).send(updatedBook)
    }
  )
})

//Find Books by Like Range
bookRouter.get('/search/bylikes/:btm/:top', (req, res, next) => {
  Book.where('likes').gte(req.params.btm).lte(req.params.top).exec((err, book)=> {
    if(err) {
      res.status(500)
      return next(err)
    }
    return res.status(200).send(book)
  })
})
module.exports = bookRouter