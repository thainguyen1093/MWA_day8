require("./books-model");

var mongoose = require("mongoose");
var dbURL = "mongodb://localhost:27017/LibraryDB";
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;

db.on("connected", function () {
  console.log("mongoose connected to " + dbURL);
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