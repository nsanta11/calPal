const db = require("../models");

module.exports = {
  // Example of finding all users in db. Will tweak for whatever we need.
  find: function(req, res) {
    db.User
      .find({_id: req.body._id})
      .then(dbModel => {
        console.log("dbmodel:", dbModel)
        // if (dbModel.length !== 0) {
        //   res.json(dbModel)
        // }
        // else {
        //   res.json({"nothing":"here"})
        // }
        res.json(dbModel)
      })
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {

  },
  update: function(req, res) {
    console.log("req.body", req.body)
    db.User
      .find({_id: req.body._id}).elemMatch("savedEvents", req.body.itemToSave)
      .then(dbModel => {
        console.log("dbmodel", dbModel)
        console.log("dbmodel type", typeof(dbModel))
        if (dbModel.length === 0) {
          db.User
          .update({_id: req.body._id}, {$push: {savedEvents: req.body.itemToSave}})
          .then(dbModel => res.json(req))
          .catch(err => res.json(err));       
        }
        else {
          res.json(req)
        }
      })
  }
}