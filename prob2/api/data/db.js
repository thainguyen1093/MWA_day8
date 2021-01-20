require("./games-model.js");
require("./students-model.js");


var mongoose = require("mongoose");
var dbURL = "mongodb://localhost:27017/meanGamesDb";
// var dbURL = "mongodb://localhost:27017/SchoolDB";

mongoose.connect(dbURL, {useNewUrlParser: true});

var db = mongoose.connection;

db.on("connected", function () {
  console.log("mongoose connected to " + dbURL);
});

db.on("disconnected", function () {
  console.log("Mongoose disconnected");
});

db.on("error", function (error) {
  console.log("Mongoose connection eeror " + error);
});

process.on("SIGINT", function(){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected by app termination");
    process.exit(0);
  });
});

process.on("SIGTERM", function(){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected by app termination")
    process.exit(0);
  });
});

process.once("SIGUSR2", function (){
  mongoose.connection.close(function(){
    console.log("Mongoose disconnected by app termination");
    process.kill(process.pid, "SIGUSR2");
  });
});