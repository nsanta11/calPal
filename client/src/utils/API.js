import axios from "axios";

export default {
  // Saves schedule to the database
  saveSchedule: function(schedule) {
    return axios.post("/api/calendar", schedule);
  },
  updateSchedule: function(schedule) {
    return axios.post("/api/calendar", schedule);
  },
  // getSchedule: function(id) {
  //   return axios.getByUser("/api/calendar", id);
  // }
};