require("./api/data/db.js");
var router = require("./api/routes");
var express = require("express");
var bodyParser = require('body-parser')
var path = require("path");
const { nextTick } = require("process");

const app = express();
var port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(function(req,res, next){
  console.log(req.method,req.url);
  next();
})
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));
app.use("/api", router);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
