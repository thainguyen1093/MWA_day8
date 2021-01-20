var express = require("express");
var router = express.Router();

var bookController = require("../controllers/bookController");
var authorController = require("../controllers/authorController");


router.route("/books")
  .get(bookController.getAll)
  .post(bookController.create);

router.route("/books/:bookId")
  .get(bookController.getById)
  .put(bookController.update)
  .delete(bookController.delete);

router.route("/books/:bookId/author")
  .get(authorController.get)
  .post(authorController.create)
  .put(authorController.update)
  .delete(authorController.delete)

module.exports = router;