var express = require("express");
var mongoose = require('mongoose');
var app = express(),
    path = require('path');
mongodb = require('mongodb'),
    // db = require("./models"),
    bcrypt = require('bcrypt');
// dbConfig = require('./db.js'),
// mongoose.connect(dbConfig.url);

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



module.exports = function (passport, user) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        Auth.findById(id, function (err, user) {
            done(err, user);

        });
    });

    passport.use(new LocalStrategy(

        console.log("USING PASSPORT"),

        {
            email: "email",

            password: "password",

            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function (req, email, password, done) {
            // var generateHash = function (password) {
            //     return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            //     console.log(password);
            // };

            Auth.findOne({ email: email }, function (err, user) {
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                if (!user.validPassword(password)) {

                    return done(null, false, { message: 'Incorrect password.' });
                }

                else {
                    var userPassword = generateHash(password);

                    var data = {
                        email: email,

                        password: userPassword,

                    };

                    Auth.create(data).then(function (newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }

                        if (newUser) {
                            return done(null, newUser);
                        }
                    });


                }

            });
        }
    ));


    app.post('/login',
        passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login', failureFlash: true })
    );
}
