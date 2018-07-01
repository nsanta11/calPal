const router = require("express").Router();
const calendar = require("../controllers/calendarsController.js");
const user = require("../controllers/usersController")

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


module.exports = router;