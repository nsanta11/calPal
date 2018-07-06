import React from "react";
import Calendar from "../Calendar";
import TestButtons from "../TestButtons";
// import Sidebar from "../Sidebar";

const CalendarWrapper = (props) => (
  <div >
     {/* <Sidebar /> */}
    <Calendar calendarId={props.match.params.id}/> 
  </div>
);

export default CalendarWrapper;