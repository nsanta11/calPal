var app = express(),
  mongodb = require('mongodb'),
  mongoose = require('mongoose');


app.use(require('serve-static')(__dirname + '/../../public'));
app.use(require('cookie-parser')());

app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'example', resave: true, saveUninitialized: true }));

var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  passportLocalMongoose = require("passport-local-mongoose");

app.set('view engine', 'ejs');
mongoose.connect("mongodb://localhost/auth_demo_app");

app.use(passport.initialize());
app.use(passport.session());

var users = [
  { id: 1, username: 'bob', password: 'secret', email: 'bob@example.com' },
  { id: 2, username: 'joe', password: '12345', email: 'joe@example.com' }
];

app.post('/login', passport.authenticate('local'),
  function (req, res) {
    // If this function gets called, authentication was successful. 
    // `req.user` contains the authenticated user. 

    res.redirect('/users/' + req.user.username);
  });
app.post('/login', passport.authenticate('local'),
  function (req, res) {
    // If this function gets called, authentication was successful. 
    // `req.user` contains the authenticated user. 

    res.redirect('/users/' + req.user.username);
  });


passport.use(new LocalStrategy(

  function (username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      if (!user.validPassword(password)) {

        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, false, { message: 'Incorrect password.' });
    });
  }
));

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })
);


