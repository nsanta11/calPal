const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport = require('./mongo-connector/passport');

const db = require("./models");
const routes = require("./routes/apiRoutes");
const MongoStore = require('connect-mongo')(session);
const user = require('./routes/auth')

const authRoutes   = require('./routes/auth');
const testRoutes   = require('./routes/test');
// const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3001;
// const router = express.Router();
require('./mongo-connector/passport/');
// require('./mongo-connector/passport')(passport);

// var configDB = require('./mongo-connector/database');

// // configuration ===============================================================
// mongoose.connect(configDB.url); // connect to our database


// log every request to the console
app.use(morgan('dev')); 
// read cookies (needed for auth)
app.use(cookieParser()); 
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));


mongoose.connect("mongodb://localhost/CalPal", function(err, db) {
  if(err) { return console.dir(err); }
});
// Sessions
app.use(
	session({
		secret: 'fraggle-rock', //pick a random string to make the hash that is generated secure
		store: new MongoStore({ mongooseConnection: mongoose.connection }),
		resave: false, //required
		saveUninitialized: false //required
	})
)


app.use(passport.initialize());
 // persistent login sessions
app.use(passport.session());



// routes ======================================================================
app.use('/auth', authRoutes);
app.use('/test', testRoutes);
app.use('/user', user)

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/UserTest";
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);



// //app.get("/test", function(req, res) {
// //console.log(db)

app.get("/api/test", function(req, res) {
  res.send("Hello");
})


app.use(routes);

app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});

