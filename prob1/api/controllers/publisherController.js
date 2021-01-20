var mongoose = require("mongoose");

var Game = mongoose.model("Game");

module.exports.publisherGet = function (req, res) {
  var gameId = req.params.gameId;
  console.log("Get gameId ", gameId);
  Game.findById(gameId).select("publisher").exec(function (err, game) {
    var response = {
      status: 200,
      message: []
    };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    } else if (!game) {
      console.log("Game id not found in database", id);
      response.status = 400;
      response.message = { "message": "Game ID not found" + gameId };
    } else {
      response.message = game.publisher ? game.publisher : [];
    }
    res.status(response.status).json(response.message);
  })
}

var _addPUblisher = function (req, res, game) {
  game.publisher.name = req.body.name;
  game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
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

module.exports.publisherAdd = function (req, res) {
  var gameId = req.params.gameId;
  console.log("Get gameId ", gameId);

  Game.findById(gameId).select("pulisher").exec(function (err, game) {
    var response = { status: 200, message: [] };
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
      if (!(game.publisher)) {
        game.publisher = { name: "empty", location: [] };
      }
      _addPUblisher(req, res, game);
    } else {
      res.status(response.status).json(response.message)
    }
  })
}

var _updatePublisher = function (req, res, game) {
  game.publisher.name = req.body.name;
  game.publisher.location.coordinates = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
  game.save(function (err, updateGame) {
    var response = { status: 204 };
    if (err) {
      console.log("Error finding game");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.publisherUpdate = function (req, res) {
  var gameId = req.params.gameId;
  console.log("PUT gameId ", gameId);
  Game.findById(gameId).select("-reviews").exec(function (err, game) {
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
      _updatePublisher(req, res, game);
    }
  });
};

var _deletePublisher = function (req, res, game) {
  game.publisher.remove();
  game.save(function (err, game) {
    var response = { status: 204 };
    if (err) {
      console.log("Error finding game"); 
      response.status = 500; 
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.publisherDelete = function (req, res) {
  var gameId = req.params.gameId;
  console.log("PUT gameId ", gameId);
  Game.findById(gameId).select("-reviews").exec(function (err, game) {
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
      _deletePublisher(req, res, game);
    }
  });
};