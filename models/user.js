const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  calendars: {type: Array, default: null},
  created: {type: Date, default: Date.now}
});


const User = mongoose.model("User", UserSchema);

module.exports = User;