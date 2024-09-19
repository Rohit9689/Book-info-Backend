  const mongoose = require('mongoose')

  const BookSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    author : {
        type: String,
        required: true
    },
    rating : {
        type: Number,
        required: true
    },
    price : {
        type: Number,
        required:true
    },
    comments : {
          type: String,
          required: true
    }
  })

  module.exports = mongoose.model('bookInfo',  BookSchema)