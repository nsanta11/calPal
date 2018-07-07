import axios from "axios";

export default {
  // Saves schedule to the database
  saveSchedule: function(schedule) {
    return axios.post("/api/calendar", schedule);
  }
};