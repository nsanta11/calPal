const router = require("express").Router();
const calendar = require("../controllers/calendarsController.js");
const user = require("../controllers/usersController")
const db = require("../models");
const Auth = db.Auth;


//calendar api routes
router.route("/api/calendar/")
  .get(calendar.find)
  .post(user.create)
  .put(user.update);


// router.route("/api/schedule")
//   .get(calendar.findById);

//user api routes
// router.route("/api/user/")
//   .get(user.find)
//   .post(user.create)
//   .put(user.update)


module.exports = router;