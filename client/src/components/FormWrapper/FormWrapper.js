import React from "react";
import Form from "../Form";

class FormWrapper extends React.Component {
  state = {
    Forms: [],  //This is to create multiple <Forms /> on the screen
    scheduleName: "",
    public: true,
    schedule: {}, //might need this to push schedule to the db
    savedEvents: []
  }

  //this will change this.state.public to private if private is checked
  setPublic = event => {
    if(event.target.value === "Private") {
      this.setState({public: false});
    } 
  }

  //will update scheduleName while inputting scheduleName, this can be used to show user that they are inputting a unique scheduleName (will implement later)
  handleChange = event => {
    this.setState({scheduleName: event.target.value});
  }

  //methods to save all form info to database
  saveEvents = () => {
    const schedule = {
      title: this.state.scheduleName,
      public: this.state.public,
      author: "Need to get this from cookies, will implement later",
      savedEvents: this.state.savedEvents,
    };

    console.log(schedule);
  }

  //Create additional event forms
  moreEvents = () => {
    //might want to insert a unique schedule name check here so no forms appear until it is unique.  If not, start with one event form
    const Forms = this.state.Forms;
    this.setState({Forms: Forms.concat(<Form 
      key={`form${Forms.length}`}
      id={`form${Forms.length}`}
      deleteEvent={this.deleteEvent}
    />)});
    console.log(this.state.Forms);
  }

  deleteEvent = (id) => {
    const Forms = this.state.Forms.filter(thisEvent => thisEvent.props.id !== id);
    this.setState({Forms});
  }
  
  render() {
    return ( 
      <div id = "FormWrapper" >
        <h1>Create a new schedule</h1>
        <form>
          Schedule Name: 
          <input 
            value={this.state.scheduleName}
            onChange={this.handleChange} 
            name="scheduleName" 
          /> <br />
          <div onChange={this.setPublic.bind(this)}>
            <input type="radio" id="public" name="pub-priv" value="Public" />Public
            <input type="radio" id="private" name="pub-priv" value="Private" />Private
          </div>
          <p>Give the following people administrative access: <br />
          (seperate emails with a space or press enter after each one)</p>
          <textarea />
          <br />
          {this.state.Forms}
          <button 
            className="moreEvents"
            onClick={ event => {
              event.preventDefault();
              this.moreEvents();
            }}
            >
              + Event
          </button>
          <p>Include the emails of anybody you would like to share this calendar with.  This is the only way other users may find a private calendar.
          (seperate emails with a space or press enter after each one)</p>
          <textarea name="shareList" />
          <button 
            className="saveSched"
            onClick = {event => {
              event.preventDefault();
              this.saveEvents();
            }}
          >
            Save and Publish
          </button>
        </form>
      </div>
    )
  }
}

export default FormWrapper;

