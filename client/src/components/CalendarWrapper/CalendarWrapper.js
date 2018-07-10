import React from "react";
import Calendar from "../Calendar";
import Sidebar from "../Sidebar";
import { Grid } from 'semantic-ui-react';





class CalendarWrapper extends React.Component {
  state = {
    schedules: [
      {
        title: 'Dbacks',
        allDay: false,
        start: "2018-07-09T16:00:00",
      },
      {
        title: 'Another Event',
        allDay: false,
        start: "2018-07-09T18:00:00"
      },
      {
        title: 'More stuff!',
        allday: false,
        start: "2018-07-12T12:00:00"
      }
    ]
  }

  render() {
    return(
      <div >
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Sidebar />
            </Grid.Column>
            <Grid.Column width={12}>
              <Calendar schedules={this.state.schedules}/> 
           </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
};

export default CalendarWrapper;