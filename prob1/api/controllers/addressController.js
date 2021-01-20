var mongoose = require("mongoose");

var Student = mongoose.model("Student");

module.exports.gamesGetOneAddressesGetAll = function (req, res) {
  var studentId = req.params.studentId;
  Student.findById(studentId).select("address").exec(function (err, datas) {
    if (err) {
      console.log("Error finding address");
      res.status(500).json(err);
    } else {
      console.log("Found address", datas.length);
      res.json(datas);
    }
  });
};

module.exports.gamesGetOneAddressesGetOne = function (req, res) {

  var studentId = req.params.studentId;
  var addressId = parseInt(req.params.addressId);

  Student.findById(studentId).select("address").exec(function (err, data) {
    var response = {
      status: 200,
      message: data.address[addressId]
    };
    if (err) {
      console.log("Error finding address");
      response.status = 500;
      response.message = err;
    } else if (!data) {
      response.status = 404;
      response.message = { "message": "Student ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};