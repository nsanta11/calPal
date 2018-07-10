import axios from "axios";

export default {
  // Saves schedule to the database
  saveSchedule: function(schedule) {
    return axios.post("/api/calendar", schedule);
  },
  updateSchedule: function(schedule) {
    return axios.post("/api/calendar", schedule);
  },
  getSchedules: function() {
    return axios.get("/api/calendar");
  },
  getSchedule: function(title) {
    return axios.get("/api/calendar", title);
  }
};