const db = require("../models");

module.exports = {
  // Example of finding all calendars in db. Will tweak for whatever we need.
  find: function(req, res) {
    db.Calendar
      .find(req.query)
      .then((dbModel) => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Calendar 
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.state(422).json(err));
  },
  update: function(req, res) {
    db.Calendar
      .findOneAndUpdate({_id: req.params.id}, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.state(422).json(err));
  }
}