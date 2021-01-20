
var mongoose = require("mongoose");
var Game = mongoose.model("Game");

module.exports.reviewGetAll = function (req, res) {
  var gameId = req.params.gameId;
  Game.findById(gameId).select("reviews").exec(function (err, doc) {
    res.status(200).json(doc.reviews);
  })
}
module.exports.reviewGetOne = function (req, res) {
  var gameId = req.params.gameId;
  var reviewId = req.params.reviewId;

  console.log("GET reviewId " + reviewId + " for gameId " + gameId);
  Game.findById(gameId).select("reviews").exec(function (err, game) {
    var review = game.reviews.id(reviewId);
    res.status(200).json(review);
  })
}

var _addReview = function (req, res, game) {
  var review = {
    name: req.body.name,
    rating: req.body.rating,
    review: req.body.review
  }

  game.reviews.push(review);

  game.save(function (err, updatedGame) {
    var response = {
      status: 200,
      message: []
    }

    if (err) {
      response.status = 500;
      response.message = err;
    } else {
      response.status = 201;
      response.message = updatedGame.publisher;
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.reviewAddOne = function (req, res) {
  var gameId = req.params.gameId;

  console.log("Add review for gameId " + gameId);
  Game.findById(gameId).select("reviews").exec(function (err, game) {

    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      console.log("Game Id not found in database", id);
      response.status = 404;
      response.message = { "message": "Game Id not found" + gameId };
    }
    if (game) {
      if (!game.reviews) {
        game.reviews = [];
      }
      _addReview(req, res, game);
    } else {
      res.status(response.status).json(response.message)
    }

  })
}