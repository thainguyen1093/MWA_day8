var mongoose = require("mongoose");

var addressSchema = new mongoose.Schema({
  name: {
    type: String
  }
});

var studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  grade: {
    type: Number,
    required: true
  },
  address: [String]
});

mongoose.model("Student", studentSchema, "Students")