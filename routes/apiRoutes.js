const router = require("express").Router();
const calendar = require("../controllers/calendarsController.js");
const user = require("../controllers/usersController")
const db = require("../models");
const Auth = db.Auth;


//calendar api routes
router.route("/api/calendar/")
  .get(calendar.find)
  .post(calendar.create)
  .put(calendar.update)

//user api routes
// router.route("/api/user/")
//   .get(user.find)
//   .post(user.create)
//   .put(user.update)

//auth api routes
router.route("/api/Authentication/")
 .post(function(req, res){
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

module.exports = router;