// const router = require("express").Router();
const calendarsController = require("../controllers/calendarsController.js");
const usersController = require("../controllers/usersController")
const db = require("../models");
const Auth = db.Auth;


module.exports = function(app) {

    app.post("/userauth", function (req, res) {
        console.log(req.body);
        var testUser = new Auth(req.body);
        testUser.save(function (err) {
          if (err) throw err;
      
          // fetch user and test password verification
          Auth.findOne({ email: req.body.email }, function (err, user) {
            if (err) throw err;
      
            // test a matching password
            user.comparePassword('Password123', function (err, isMatch) {
              if (err) throw err;
              console.log('Password123:', isMatch); // -> Password123: true
            });
      
            // test a failing password
            user.comparePassword('123Password', function (err, isMatch) {
              if (err) throw err;
              console.log('123Password:', isMatch); // -> 123Password: false
            });
          });
        });
        res.json(req.body);
      })

}