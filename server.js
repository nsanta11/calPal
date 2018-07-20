const express = require("express");
const path = require('path');
// const flash = require('flash');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const app = express();
const passport = require('./mongo-connector/passport/');

// const passport = require('./mongo-connector/passport');
// const user = require('./routes/auth/index')

const dbConnection = require("./models/mongo");
const User = require('./models/user');
const routes = require("./routes/apiRoutes");
const MongoStore = require('connect-mongo')(session)


// const authRoutes   = require('./routes/auth');
// const testRoutes   = require('./routes/test');

const PORT = process.env.PORT || 3001;
const router = express.Router();
// require('./mongo-connector/passport')(passport);

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


// mongoose.connect("mongodb://localhost/CalPal", function(err, db) {
//   if(err) { return console.dir(err); }
// });
// Sessions
app.use(
  session({
  secret: 'default passphrase', //pick a random string to make the hash that is generated secure
  store: new MongoStore({ mongooseConnection: dbConnection }),
  resave: false, //required
  saveUninitialized: false //required
  })
)


// Passport
app.use(passport.initialize())
app.use(passport.session()) // calls the deserializeUser


app.use('/auth', require('./routes/auth'))
app.use(routes)

// routes ======================================================================
// app.use('/auth', authRoutes);
// app.use('/test', testRoutes);
// app.use('/user', user)

// const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/UserTest";
// mongoose.Promise = Promise;
// mongoose.connect(MONGODB_URI);



// //app.get("/test", function(req, res) {

app.get("/api/test", function(req, res) {
  res.send("Hello");
})

// ====== Error handler ====
app.use(function(err, req, res, next) {
	console.log('====== ERROR =======')
	console.error(err.stack)
	res.status(500)
})

// app.use(routes);

// ==== Starting Server =====

app.listen(PORT, () => {
	console.log(`App listening on PORT: ${PORT}`)
})