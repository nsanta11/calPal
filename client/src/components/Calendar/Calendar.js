import React from "react";
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import './Calendar.css';

class Calendar extends React.Component {

  state = {
    events: [
      {
        title: 'Dbacks',
        allDay: false,
        start: "2018-07-09T16:00:00",
      }
    ]
  }

  //create modal when event is clicked on for more information.  Modals are part of semantic

  render(props) {
    return (
      <div id="calContainer"
            style={{height: 600,
                    width: 800}}>
        <FullCalendar
          id = "calendarID"
          header = {{
            left: 'prev, next, today',
            center: 'title',
            right: 'month, basicWeek, basicDay, list'
          }}
          events = {this.props.onScheduleChange}
          style={{background: "red"}}
        />
      </div>
    )
  }
}

export default Calendar;