var mongoose = require("mongoose");

var authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  rate: {
    type: Number,
    min: 1,
    max: 5
  }
});

var bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  rate: {
    type: Number,
    min: 1,
    max: 5
  },
  year: Number,
  price: Number,
  author: authorSchema
});

mongoose.model("Book", bookSchema, "books")