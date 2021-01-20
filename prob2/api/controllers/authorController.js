var mongoose = require("mongoose");
var Book = mongoose.model("Book");

module.exports.get = function (req, res) {
  var bookId = req.params.bookId;
  console.log("Get bookId ", bookId);
  Book.findById(bookId).select("author").exec(function (error, book) {
    var response = {
      status: 200,
      message: {}
    }
    if (error) {
      console.log("Error finding book");
      response.status = 500;
      response.message = error
    } else if (!book) {
      console.log("book not foud in db", bookId);
      response.status = 400;
      response.message = { "message": "book not found" };
    } else {
      response.mesage = book.author ? boo.author : {}
    }
    res.status(response.status).json(response.message);
  });
}

var _create = function (req, res, book) {
  book.author = {
    name: req.body.name,
    rate: parseInt(req.body.rate),
    age: parseInt(req.body.age)
  }

  book.save(function (error, updatedBook) {
    var response = {
      status: 201,
      message: []
    }

    if (error) {
      response.status = 500;
      response.message = error;
    } else {
      response.status = 201;
      response.message = updatedBook.author;
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.create = function (req, res) {
  var bookId = req.params.bookId;
  console.log("get by bood id", bookId);

  Book.findById(bookId).select("author").exec(function (error, book) {
    var response = { status: 200, message: [] };
    if (error) {
      console.log("Error finding book");
      response.status = 500;
      response.message = error;
    } else if (!book) {
      response.status = 404;
      response.message = { "message": "book id not found" };
    }

    if (response.status == 200) {
      _create(req, res, book);
    } else {
      res.status(response.status).json(response.message);
    }
  })
}

var _update = function (req, res, book) {
  book.author.name = req.body.name;
  book.author.rate = parseInt(req.body.rate);
  book.author.age = parseInt(req.body.age);

  book.save(function (error, updatedBook) {
    var response = { status: 204 };
    if (error) {
      console.log("Error update book");
      response.status = 500;
      response.message = error;
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.update = function (req, res) {
  var bookId = req.params.bookId;
  console.log("update book", bookId);
  Book.findById(bookId).select("author").exec(function (error, book) {
    var response = { status: 204 };
    if (error) {
      console.log("Error finding book");
      response.staus = 500;
      response.message = error;
    } else if (!book) {
      response.status = 404;
      response.messge = { "message": "book not found" }
    }

    if (response.status == 204) {
      _update(req, res, book);
    } else {
      res.status(response.status).json(response.message);
    }
  })
}

var _delete = function (req, res, book) {
  book.author.remove();
  book.save(function (error, book) {
    var response = { status: 204 };
    if (error) {
      console.log("Error finding book");
      response.status = 500;
      response.message = error;
    }
    res.status(response.status).json(response.message);
  })
}

module.exports.delete = function (req, res) {
  var bookId = req.params.bookId;
  console.log("delete by book id", bookId);
  Book.findById(bookId).select("author").exec(function (error, book) {
    var response = { status: 204 }
    if (error) {
      console.log("Error finding book");
      response.status = 500;
      response.message = error;
    } else if (!book) {
      response.status = 404;
      response.message = { "message": "book not found" };
    }

    if (response.status == 204) {
      _delete(req, res, book);
    } else {
      res.status(response.status).json(response.message);
    }
  })
}