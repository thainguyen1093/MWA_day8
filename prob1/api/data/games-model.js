var mongoose = require("mongoose");

var reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  review: {
    type: String,
    required: true
  },
  createdOn: {
    type: Date,
    "default": Date.now
  }
});

var publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: Number,
    required: false
  },
  established:{
    type: Date,
    required: false
  },
  location: {
    address: String,
    coordinates: [Number] // store coordinates
    // index: "2dsphere"
  }
});

var gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  year: Number,
  price: Number,
  designers: String,
  players: {
    type: Number,
    min: 1,
    max: 10
  },
  rate: {
    type: Number,
    min: 1,
    max: 10,
    "default": 1
  },
  minPlayers: Number,
  maxPlayers: Number,
  reviews:[reviewSchema],
  publisher: publisherSchema
});

mongoose.model("Game", gameSchema, "games")