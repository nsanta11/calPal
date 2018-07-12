const router = require("express").Router();
const calendar = require("../controllers/calendarsController.js");
const user = require("../controllers/usersController")
const db = require("../models");
const Auth = db.Auth;


//calendar api routes
router.route("/api/calendar/")
  .get(calendar.find)
  .post(calendar.create)
  .put(calendar.update);


// router.route("/api/schedule")
//   .get(calendar.findById);

//user api routes
// router.route("/api/user/")
//   .get(user.findOne);
//   .post(user.create)
//   .put(user.update)


module.exports = router;