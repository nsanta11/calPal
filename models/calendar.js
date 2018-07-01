const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CalendarSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  public: {
    type: Boolean,
    required: true
  },
  author: {
    type: String,
    required: true,
    default: null
  },
  savedEvents: [{
    title: String,
    link: String,
    date: Date,
    watch: Array,
    info: String,
    image: String
  }],
  password: String,
  created: {type: Date, default: Date.now}
});

const Calendar = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendar;