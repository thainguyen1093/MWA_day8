var mongoose = require("mongoose");

var Student = mongoose.model("Student");

module.exports.gamesGetAll = function (req, res) {
  
  Student.find().exec(function (err, datas) {
    if (err) {
      console.log("Error finding student");
      res.status(500).json(err);
    } else {
      console.log("Found student", datas.length);
      res.json(datas);
    }
  })
}

module.exports.gamesGetOne = function (req, res) {
  var studentId = req.params.studentId;
  Student.findById(studentId).exec(function (err, data) {
    var response = {
      status: 200,
      message: data
    };
    if (err) {
      console.log("Error finding student");
      response.status = 500;
      response.message = err;
    } else if (!data) {
      response.status = 404;
      response.message = { "message": "Student ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports.addOne = function (req, res) {
  Student.create({
    name: req.body.name,
    grade: parseInt(req.body.grade)
  }, function (err, student) {
    if (err) {
      console.log("Error creating student");
      res.status(400).json(err);
    } else {
      console.log("student created", student);
      res.status(201).json(student);
    }
  })
}

module.exports.updateOne = function (req, res) {
  var studentId = req.params.studentId;
  Student.findById(studentId).exec(function (err, student) {
    var response = { status: 204 };
    if (err) {
      console.log("Error finding student");
      response.status = 500;
      response.message = err;
    } else if (!student) {
      response.status = 404;
      response.message = { "message": "student ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      student.name = req.body.name;
      student.grade = parseInt(req.body.grade);

      student.save(function (err, updatedStudent) {
        if (err) {
          response.status = 500;
          response.message = err;
        }
        res.status(response.status).json(response.message);
      });
    }
  })
}

module.exports.deleteOne = function (req, res) {
  var studentId = req.params.studentId;
  console.log("DELETE studentId ", studentId);
  Student.findByIdAndRemove(studentId).exec(function (err, deletedGame) {
    var response = { status: 204 };
    if (err) {
      console.log("Error finding student");
      response.status = 500;
      response.message = err;
    } else if (!deletedGame) {
      response.status = 404;
      response.message = { "message": "student ID not found" };
    }
    res.status(response.status).json(response.message);
  });
}