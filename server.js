const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./models");
const routes = require("./routes/apiRoutes");

// const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
// const router = express.Router();

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/UserTest";
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

// Connect to the db

mongoose.connect("mongodb://localhost/userauth", function(err, db) {
// mongoose.connect("mongodb://localhost/userstest", function(err, db) {
//   if(err) { return console.dir(err); }
});

mongoose.connect("mongodb://localhost/CalPal", function(err, db) {
  if(err) { return console.dir(err); }
});

// //app.get("/test", function(req, res) {
// //console.log(db)


app.get("/api/test", function(req, res) {
  res.send("Hello");
})

require("./routes/apiRoutes")(app)

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

