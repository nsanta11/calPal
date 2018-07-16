const router = require("express").Router();
const calendar = require("../controllers/calendarsController.js");
const user = require("../controllers/usersController")
const db = require("../models");
const Auth = db.Auth;


router.route("/api/calendar/")
  .get(calendar.find)
  .post(calendar.create)
  .put(calendar.update);

router.route("/api/calendar/user")
  .post(user.find)
  .put(user.update)

// router.route("/api/schedule")
//   .get(calendar.findById);

//user api routes
// router.route("/api/user/")
//   .get(user.findOne);
//   .post(user.create)
//   .put(user.update)


module.exports = router;