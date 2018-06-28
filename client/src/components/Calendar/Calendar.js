import React from "react";
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';

class Calendar extends React.Component {
  state = {
    events: [
      {
        title: '4pm Dbacks',
        allDay: false,
        start: new Date(2018, 5, 26, 10, 0),
        end: new Date(2018, 5, 26, 14, 0)
      }
    ]
  }

  render() {
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
          events = {this.state.events}
          style={{background: "red"}}
        />
      </div>
    )
  }
}

export default Calendar;