import React from "react";
import FullCalendar from 'fullcalendar-reactwrapper';
import 'fullcalendar-reactwrapper/dist/css/fullcalendar.min.css';
import './Calendar.css';
import { Modal, Grid, Button } from "semantic-ui-react";

class Calendar extends React.Component {

  state = {
    title: '',
    date: '',
    watch: [],
    link: '',
    info: '',
    open: false,
  }

  moreInfo = (e) => {
    console.log(e.title);
   this.setState({
     title: e.title,
     date: e.date,
     watch: e.watch,
     link: e.link,
     info: e.info,
     open: true
   });
   console.log(this.state);
  }

  close = () => this.setState({ open: false });

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
          eventClick = {(e)=>this.moreInfo(e)}
          eventLimit = {3}
        />
        <Modal 
          open={this.state.open}
          size="small"
        >
          <Modal.Content>
            <Modal.Description>
              <Grid>
                <Grid.Row>
                    <h1>{this.state.title}</h1>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={5}>

                    {/* <p>Date: {this.state.date}</p> */}
                    <p>Website: <a className="link" href={`${this.state.link}`} target='blank'>{this.state.link}</a></p>
                        </Grid.Column>
                        <Grid.Column width={5}>
                    <p>Where to watch:</p>
                    {this.state.watch.map( (watch) => <p key={watch}>{watch}</p>)}
                    </Grid.Column>
                        <Grid.Column width={6}>
                    <p>Additional Information: {this.state.info}</p>
                    </Grid.Column>
                </Grid.Row>
              </Grid>
              <Button onClick={(e)=>this.close(e)}>Close</Button>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      </div>
    )
  }
}

export default Calendar;