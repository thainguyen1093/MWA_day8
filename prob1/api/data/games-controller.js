var mongoose = require("mongoose");
var Game = mongoose.model("Game");

module.exports.gamesGetAll = function (req, res) {
  var offset = 0;
  var count = 5;
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }

  Game.find().skip(offset).limit(count).exec(function (err, games) {
    console.log("Found games", games.length);
    res.json(games);
  });
}

module.exports.gamesGetOne = function (req, res) {
  var gameId = req.params.gameId;
  Game.findById(fameId).exec(function(err, game){
    res.status(200).json(game);
  })
}