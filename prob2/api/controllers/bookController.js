var mongoose = require("mongoose");

var Book = mongoose.model("Book")

module.exports.getAll = function (req, res) {
  var offset = 0;
  var count = 5;

  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offer, 10);
  }

  if (req.query && req.query.count) {
    count = parseInt(req.query.count);
  }

  if (isNaN(offset) || isNaN(count)) {
    res.status(400).json({ "message": "Query String Offset and Count should be a Number" });
    return;
  }

  Book.find().skip(offset).limit(count).exec(function (error, books) {
    if (error) {
      console.log("error finding book");
      res.status(500).json(error)
    } else {
      console.log("Found books: " + books.length);
      res.status(200).json(books);
    }
  });
}

module.exports.getById = function (req, res) {
  var bookId = req.params.bookId;
  Book.findById(bookId).exec(function (error, book) {
    var response = {
      status: 200,
      message: book
    }

    if (error) {
      console.log("Error finding book")
      response.status = 500;
      response.message = error;
    } else if (!book) {
      response.status = 404;
      response.message = { "message": "book not found by id" };
    }
    res.status(response.status).json(response.message);
  });
}

module.exports.create = function (req, res) {
  Book.create({
    title: req.body.title,
    rate: parseInt(req.body.rate),
    year: parseInt(req.body.year),
    price: parseFloat(req.body.price)
  }, function (error, book) {
    if (error) {
      console.log("Error while create the book");
      res.status(500).json(error)
    } else {
      console.log("book created", book)
      res.status(201).json(book)
    }
  })
}

module.exports.update = function (req, res) {
  var bookId = req.params.bookId;
  Book.findById(bookId).select("-author").exec(function (error, book) {
    var response = { status: 204 }

    if (error) {
      console.log("Error finding book");
      response.status = 500;
      response.message = error;
    } else if (!book) {
      response.status = 404;
      response.message = { "message": "book not found" };
    }

    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      book.title = req.body.title;
      book.rate = parseInt(req.body.rate);
      book.year = parseInt(req.body.year);
      book.price = parseFloat(req.body.rate);

      book.save(function (error, updatedBook) {
        if (error) {
          response.status = 500;
          response.message = error;
        }
        res.status(response.status).json(response.message);
      })
    }
  })
}

module.exports.delete = function (req, res) {
  var bookId = req.params.bookId;

  console.log("Delete book by Id", bookId);
  Book.findByIdAndRemove(bookId).exec(function (error, deletedBook) {
    var response = { status: 204 };
    if (error) {
      console.log("Error finding book");
      response.status = 500;
      response.message = error;
    } else if (!deletedBook) {
      response.status = 404;
      response.message = { "message": "book not found to delete" }
    }
    res.status(response.status).json(response.message);
  });
}