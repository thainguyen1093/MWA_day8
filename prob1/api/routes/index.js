var express = require('express')

var router = express.Router();

var controllerGames = require("../controllers/games-controller");
var controllerReviews = require("../controllers/reviews-controller");
var controllerPublisher = require("../controllers/publisherController");

var controllerStudents = require("../controllers/students-controller");
var controllerAddresses = require("../controllers/addressController");


router.route("/games").get(controllerGames.gamesGetAll)
  .post(controllerGames.gameAddOne);
router.route("/games/:gameId").get(controllerGames.gamesGetOne)
  .put(controllerGames.gamesUpdateOne)
  .delete(controllerGames.gamesDeleteOne);

router.route("/games/:gameId/reviews")
  .get(controllerReviews.reviewGetAll)
  .post(controllerReviews.reviewAddOne);
router.route("/games/:gameId/reviews/:reviewId").get(controllerReviews.reviewGetOne);

router.route("/games/:gameId/publisher")
  .get(controllerPublisher.publisherGet)
  .post(controllerPublisher.publisherAdd)
  .put(controllerPublisher.publisherUpdate)
  .delete(controllerPublisher.publisherDelete);


router.route("/students").get(controllerStudents.gamesGetAll)
  .post(controllerStudents.addOne);

router.route("/students/:studentId").get(controllerStudents.gamesGetOne)
  .put(controllerStudents.updateOne)
  .delete(controllerStudents.deleteOne);;

router.route("/students/:studentId/addresses").get(controllerAddresses.gamesGetOneAddressesGetAll);

router.route("/students/:studentId/addresses/:addressId").get(controllerAddresses.gamesGetOneAddressesGetOne);

module.exports = router;