import React from "react";
import Calendar from "../Calendar";
import Sidebar from "../Sidebar";
import { Grid } from 'semantic-ui-react';





const CalendarWrapper = () => (
  <div >
    <Grid>
      <Grid.Row>
      <Grid.Column width={4}>
        <Sidebar />
      </Grid.Column>
      <Grid.Column width={12}>
        <Calendar /> 
      </Grid.Column>
      </Grid.Row>
    </Grid>
  </div>
);

export default CalendarWrapper;