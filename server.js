const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const db = require("./models");

// const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/UserTest";
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

// Connect to the db
mongoose.connect("mongodb://localhost/userstest", function(err, db) {
  if(err) { return console.dir(err); }
});

//app.get("/test", function(req, res) {
//console.log(db)

  db.Auth.create({email:"Fiat", password:"500"})
//})
      // Create a new user database using the `result` object built from scraping

  

app.get("/api/test", function(req, res) {
  res.send("Hello");
})

app.listen(PORT, function() {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
  });