const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const passport = require('passport');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const db = require("./models");
const routes = require("./routes/apiRoutes");

const authRoutes   = require('./routes/auth');
const testRoutes   = require('./routes/test');
// const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
// const router = express.Router();
require('./mongo-connector/passport/index');
require('./mongo-connector/passport')(passport);

// var configDB = require('./mongo-connector/database');

// // configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database


// log every request to the console
app.use(morgan('dev')); 
// read cookies (needed for auth)
app.use(cookieParser()); 
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));

// required for passport
app.use(session({
  secret: 'whatever', // session secret
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// routes ======================================================================
app.use('/auth', authRoutes);
app.use('/test', testRoutes);

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/UserTest";
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);

mongoose.connect("mongodb://localhost/CalPal", function(err, db) {
  if(err) { return console.dir(err); }
});

// //app.get("/test", function(req, res) {
// //console.log(db)

app.get("/api/test", function(req, res) {
  res.send("Hello");
})

app.use(routes);

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

