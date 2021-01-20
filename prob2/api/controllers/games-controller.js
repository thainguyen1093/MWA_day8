var mongoose = require("mongoose");

var Game = mongoose.model("Game");

var runGeoQuery = function (req, res) {
  var lng = parseFloat(req.query.lng);
  var lat = parseFloat(req.query.lat);

  var point = {
    type: "Point",
    coordinates: [lng, lat]
  }

  Game.aggregate([{
    "GeoNear": {
      "near": point,
      "spherical": true,
      "distanceField": "distance",
      "maxDistance": 750000,
      "num": 5
    }
  }], function (err, results) {
    console.log("Geo results", results);
    console.log("Geo error", err);
    res.status(200).json(results);
  })
}

module.exports.gamesGetAll = function (req, res) {
  var offset = 0;
  var count = 5;
  var maxCount = 10;

  if (req.query && req.query.lat && req.query.lng) {
    runGeoQuery(req, res);
    return;
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, 10);
  }
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, 10);
  }
  if (isNaN(offset) && isNaN(count)) {
    res.status(400).json({ "message": "Querytring Offset and Count should be numbers" });
    return;
  }
  if (count > maxCount) {
    res.status(400).json({ "message": "Cannot exceed count of " + maxCount });
    return;
  }
  Game.find().skip(offset).limit(count).exec(function (err, games) {
    if (err) {
      console.log("Error finding games");
      res.status(500).json(err);
    } else {
      console.log("Found games", games.length);
      res.json(games);
    }
  })
}

module.exports.gamesGetOne = function (req, res) {
  var gameId = req.params.gameId;
  Game.findById(gameId).exec(function (err, game) {
    var response = {
      status: 200,
      message: game
    };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = { "message": "Game ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.gameAddOne = function (req, res) {
  Game.create({
    title: req.body.title,
    year: parseInt(req.body.year),
    price: parseFloat(req.body.price),
    designers: req.body.designer,
    publisher: { name: "empty", location: [] },
    minPlayers: parseInt(req.body.minPlayers),
    maxPlayers: parseInt(req.body.maxPlayers),
    rate: parseFloat(req.body.rate)
  }, function (err, game) {
    if (err) {
      console.log("Error creating games");
      res.status(400).json(err);
    } else {
      console.log("Game created", game);
      res.status(201).json(game);
    }
  })

}

module.exports.gamesUpdateOne = function (req, res) {
  var gameId = req.params.gameId;
  Game.findById(gameId).select("-reviews -publisher").exec(function (err, game) {
    var response = { status: 204 };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      response.status = 404;
      response.message = { "message": "Game ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      game.title = req.body.title;
      game.year = parseInt(req.body.year);
      game.price = parseFloat(req.body.price);
      game.designers = req.body.designer;
      game.minPlayers = parseInt(req.body.minPlayers);
      game.maxPlayers = parseInt(req.body.maxPlayers);
      game.rate = parseFloat(req.body.rate);
      game.minAge = parseInt(req.body.minAge);

      game.save(function (err, updatedGame) {
        if (err) {
          response.status = 500;
          response.message = err;
        }
        res.status(response.status).json(response.message);
      });
    }
  })
}

module.exports.gamesDeleteOne = function (req, res) {
  var gameId = req.params.gameId;
  console.log("DELETE gameId ", gameId);
  Game.findByIdAndRemove(gameId).exec(function (err, deletedGame) {
    var response = { status: 204 };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!deletedGame) {
      response.status = 404;
      response.message = { "message": "Game ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};