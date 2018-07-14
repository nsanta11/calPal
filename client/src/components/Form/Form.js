import React from "react";
import "./Form.css";
import API from "../../utils/API";
import Datetime from "react-datetime";
import 'react-datetime/css/react-datetime.css';
import { Grid, Button } from 'semantic-ui-react';
import {Redirect} from 'react-router-dom';


class Form extends React.Component {
  state = {
    redirectTo: null,
    scheduleName: "",
    public: true,
    schedulePassword: "",
    //the following are to create multiple events
    eventsArray: [],
    eventsCount: 0,
    //the following are to create multiple Wheres per event
    watchCount: 0
  }

  //will update scheduleName while inputting scheduleName, this can be used to show user that they are inputting a unique scheduleName (will implement later)
  handleChange = event => {
    const name = event.target.name;
    this.setState({[name]: event.target.value});
  }

  //this will change this.state.public to private if private is checked
  setPublic = event => {
    if(event.target.value === "Private") {
      this.setState({public: false});
    } else {
      this.setState({public: true});
    }
  }

  //methods to save all form info to database
  saveEvents = () => {
    const author = localStorage.getItem("_id");
    const schedule = {
      title: this.state.scheduleName,
      public: this.state.public,
      password: this.state.schedulePassword,
      author: author,
      savedEvents: this.state.eventsArray,
    };

    console.log(schedule);
    API.saveSchedule(schedule)
      .then(res => console.log("published"))
      .then(this.redirect())
      .catch(err => console.log(err));
  }

  //Create additional event forms
  moreEvents = () => {
    let eventsCount = this.state.eventsCount;
    const eventsArray=this.state.eventsArray;
    eventsArray.push({
      title: "",
      date: "",
      watch: [],
      link: "",
      info: ""
    });
    this.setState({
      eventsArray: eventsArray,
      eventsCount: ++eventsCount
    });
  }

  //create more watch locations
  moreWatch = (index) => {
    let watch = this.state.eventsArray;
    watch[index].watch.push("");
    this.setState({eventsArray: watch});
  }

  //update the individual event's info in this.state.eventsArray
  handleInputChange = (index, e) => {
    const name = e.target.name;
    let value = e.target.value;
    let eventsArray = this.state.eventsArray;
    eventsArray[index][name] = value;
    this.setState({eventsArray});
  }

  //update the individual watch location in this.state.eventsArray[index].watch array
  handleWatchChange = (index, Windex, e) => {
    let value = e.target.value;
    let eventsArray = this.state.eventsArray;
    eventsArray[index].watch[Windex] = value;
    this.setState({eventsArray});
  }

  //update the date for individual events in this.state.eventsArray
  handleDateChange = (index, e) => {
    let eventsArray = this.state.eventsArray;
    eventsArray[index].date = e._d;
    this.setState({eventsArray});
  }
  
  redirect=() => {
    this.setState({
			redirectTo: `/calendar`
		});
  }

  render() {
    if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
    return ( 
      <div id = "FormWrapper" >
        <h1>Create a new schedule</h1>
        <form>
        Schedule Name:  
          <input 
            value={this.state.scheduleName}
            onChange={this.handleChange} 
            name="scheduleName"
            className="createInput" 
          /> <br />
          <div onChange={this.setPublic.bind(this)}>
            <input type="radio" id="public" name="pub-priv" className="pub-priv" value="Public" />Public
            <input type="radio" id="private" name="pub-priv" className="pub-priv" value="Private" />Private
          </div>
          {!this.state.public ? 
          <div>Schedule password:
            <input
              value={this.state.schedulePassword}
              onChange={this.handleChange}
              name="schedulePassword"
              className = "createInput"
            />
          </div> : <div name="noPassword" />}
          {/* <p>Give the following people administrative access: <br />
          (seperate emails with a space or press enter after each one)</p>
          <textarea /> */}
          {this.state.eventsArray.map((event, index) =>
                <div className="Form" id={index} key={index}>
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={8}>
                      <Grid.Row className="eventName">
                Event Name: 
                <input 
                  name="title" 
                  className = "createInput"
                  value={event.title} 
                  onChange={(e) => this.handleInputChange(index, e)} 
                />
                    </Grid.Row>
                    <Grid.Row>
                <p className="ddate">Date: </p>
                <Datetime 
                  name="date" 
                  onChange={(e) => this.handleDateChange(index,e)}
                />
                </Grid.Row>
                <Grid.Row className="website">
                Website: 
                <input 
                  name="link" 
                  className = "createInput"
                  value={event.link} 
                  onChange={(e) => this.handleInputChange(index, e)} 
                />
                </Grid.Row>
                </Grid.Column>
                <Grid.Column width={8}>
                <Grid.Row>
                 <p className="where">Where to Watch?</p>
                 </Grid.Row>
                {event.watch.map((Wevent, Windex) => 
                  //Windex is short for watch index, need both that and the form index
                  <Grid.Row>
                  <input id={`watch${Windex}`}
                    name={Wevent}
                    value={Wevent} 
                    key={`watch${Windex}`} 
                    className = "createInput"
                    onChange={(e) => this.handleWatchChange(index, Windex, e)} 
                  /> 
                  </Grid.Row>
                )}
                  <Grid.Row>
                <Button 
                  className="moreWatch"
                  onClick={(event) => {
                    event.preventDefault();
                    this.moreWatch(index);
                  }}
                >
                  + Location
                </Button>
                </Grid.Row>
                <Grid.Row className="addInfo">
                Additional Information: 
                </Grid.Row>
                <Grid.Row>
                <textarea 
                  name="info" 
                  value={event.info} 
                  onChange={(e) => this.handleInputChange(index, e)} 
                />
                </Grid.Row>
                </Grid.Column>
                </Grid.Row>
                </Grid>
              </div>
          )}
          <Button 
            className="moreEvents"
            floated='left'
            onClick={ event => {
              event.preventDefault();
              this.moreEvents();
            }}
            >
              + Event
          </Button>
          {/* <p>Include the emails of anybody you would like to share this calendar with.  This is the only way other users may find a private calendar.
          (seperate emails with a space or press enter after each one)</p>
          <textarea name="shareList" /> */}
          <Button.Group
          floated='right'>
          <Button 
            className="saveSched"
            onClick = {event => {
              event.preventDefault();
              this.saveEvents();
            }}
          >
            Publish
          </Button>
          <Button.Or  />
          <Button className="cancel"
          onClick = {e => {
            e.preventDefault();
            this.redirect();
          }}>
            Cancel
          </Button>
          </Button.Group>
        </form>
      </div>
    )
  }
}

export default Form;
