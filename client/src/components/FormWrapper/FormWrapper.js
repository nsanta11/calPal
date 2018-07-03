import React from "react";

class FormWrapper extends React.Component {
  state = {
    scheduleName: "",
    public: true,
    //the following are to create multiple events
    eventsArray: [],
    eventsCount: 0,
    //the following are to create multiple Wheres per event
    watchCount: 0
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
      savedEvents: this.state.eventsArray,
    };

    console.log(schedule);
  }

  //Create additional event forms
  moreEvents = () => {
    let eventsCount = this.state.eventsCount;
    const eventsArray=this.state.eventsArray;
    eventsArray.push({
      title: "",
      date: "",
      watch: []
    });
    this.setState({
      eventsArray: eventsArray,
      eventsCount: ++eventsCount
    });
  }

  moreWatch = (index) => {
    // console.log(this.state.eventsArray[index].watch);
    let watch = this.state.eventsArray;
    watch[index].watch.push("");
    // console.log(watch);
    this.setState({eventsArray: watch});
  }

  handleInputChange = (index, e) => {
    const name = e.target.name;
    let value = e.target.value;
    let eventsArray = this.state.eventsArray;
    eventsArray[index][name] = value;
    this.setState({eventsArray});
  }

  handleWatchChange = (index, Windex, e) => {
    let value = e.target.value;
    let eventsArray = this.state.eventsArray;
    console.log(eventsArray[index].watch[Windex]);
    eventsArray[index].watch[Windex] = value;
    this.setState({eventsArray});
    console.log(this.state.eventsArray);
  }
  
  render() {
    return ( 
      <div id = "FormWrapper" >
        <h1>Create a new schedule</h1>
        <form>
          {this.state.eventsArray.map((event, index) =>
                <div className="Form" id={index} key={index}>
                Event Name:
                <input 
                  name="title" 
                  value={event.title} 
                  onChange={(e) => this.handleInputChange(index, e)} 
                />
                Date: 
                <input 
                  name="date" 
                  value={event.date} 
                  onChange={(e) => this.handleInputChange(index, e)} 
                />
                 Where to Watch?
                {event.watch.map((Wevent, Windex) => 
                  //Windex is short for watch index, need both that and the form index
                  <input id={`watch${Windex}`}
                    name={Wevent}
                    value={Wevent} 
                    key={`watch${Windex}`} 
                    onChange={(e) => this.handleWatchChange(index, Windex, e)} 
                  />
                )}
                <button 
                  className="moreWatch"
                  onClick={(event) => {
                    event.preventDefault();
                    this.moreWatch(index);
                  }}
                >
                  + location
                </button>
              </div>
          )}
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
