import React from "react";
// import "./Calendar.css";
// const EventCalendar = require('react-event-calendar');
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

moment.locale("en");
BigCalendar.momentLocalizer(moment);


const Calendar = () => (
  <div style={{height: 600,
              width: 800}}>
  <BigCalendar
    events = {[{
      title: '4pm Dbacks',
      allDay: false,
      start: new Date(2018, 5, 26, 10, 0),
      end: new Date(2018, 5, 26, 14, 0)
    }]}
    view="month"
    views={["month"]}
    date={new Date(2018, 5)}
    style={{background: "brown",
            color: "white"}}
  />
  </div>
)




//using react-event-calendar
// class Calendar extends React.Component {
//   state = {
//     date: 1,
//     month: 1,
//     year: 2018,
//     events: []
//    }

//   componentWillMount = () => {
//     this.getDate();
//     this.setEvents();
//   }

//   apiEvents = () => {
//     //get events from api
//   }

//   dbEvents = () => {
//     //get events from db
//   }

//   setEvents = () => {
//     const sampleEvents = [
//       {
//         start: '2018-06-28',
//         end: '2018-06-28',
//         eventClasses: 'sports',
//         title: '6pm DBacks vs. Dodgers',
//         description: 'additional info'
//       },{
//         start: '2018-07-04',
//         end: '2018-07-04',
//         eventClasses: 'other',
//         title: '9pm Fireworks at Tempe Town Lake',
//         description: 'more info'
//       }
//     ]
//     this.setState({events: sampleEvents});
//   }

//   getDate = () => {
//     let d = new Date();
//     this.setState({
//       date: d.getDate(),
//       month: d.getMonth(),
//       year: d.getFullYear()
//     })
//   }


//   render = props => (
//     <EventCalendar
//         month={6}
//         year={2018}
//         // events={this.state.events}
//         // onEventClick={(target, eventData, day) => console.log(eventData)}
//     />
//   )

// }

export default Calendar;