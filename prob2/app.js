require("./api/data/db")
var express = require("express");
var bodyParser = require("body-parser");
var router = require("./api/routes");
var path = require("path");

var app = express();
var port = 3000;

// for parsing application/xwww-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", router);
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});