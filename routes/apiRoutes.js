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
router.route("/api/user/")
  .get(user.find)
  .post(user.create)
  .put(user.update)

//auth api routes
router.route("/api/Authentication/")
  .get(Authentication.find)
  .post(Authentication.create)
  .put(Authentication.update)

module.exports = router;