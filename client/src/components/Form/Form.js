import React from "react";

class Form extends React.Component {
  state = {
    Watch: [], //this is to add multiple watch locations
    _Event: {
    title: "",
    date: "",
    time: "",
    link: "",
    info: "",
    watch: []
    }
  }

  //onClick event to add multiple watch locations
  addWatch = event => {
    event.preventDefault();
    const Watch = this.state.Watch;
    this.setState({watch: this.state._Event.watch.push(``),
      Watch: Watch.concat(<input 
        name={`watch[${Watch.length}]`} 
        arraypos={Watch.length} 
        value={this.state._Event.watch[Watch.length]} 
        key={`watch${Watch.length}`} 
        onChange={this.handleInputChange} 
      />
    )});
    console.log(this.state._Event.watch);
  }

  //will record all changes as they happen since Form does not know when the save button will be pushed, it will always be ready
  handleInputChange = event => {
    const name = event.target.name;
    let value = event.target.value;
    if(name.startsWith("watch")) {
      const i = event.target.arrayPos;
      let watch = this.state._Event.watch;
      watch[i] = value;
      this.setState({...this.state._Event, watch: watch});
    }
    else {
      this.setState({...this.state._Event, [name]: value});
    }
  }

  render() {
  return (
    <div className="Form" id={this.props.id}>
      Event Name: 
      <input 
        name="title" 
        value={this.state.title} 
        onChange={this.handleInputChange} 
      />
      Date: 
      <input 
        name="date" 
        value={this.state.date} 
        onChange={this.handleInputChange}
      />
      Time: 
      <input 
        name="time" 
        value={this.state.time}  
        onChange={this.handleInputChange} 
      />
      Where to Watch? 
      {this.state.Watch}
      <button onClick={this.addWatch}>
        + location
      </button>
      Website: 
      <input 
        name="link" 
        value={this.state.link} 
        onChange={this.handleInputChange}
      />
      Additional Information:
      <textarea 
        name="info" 
        value={this.state.info} 
        onChange={this.handleInputChange}/>
      <button 
        onClick={(event) => {
          console.log(this.props.id);
          event.preventDefault()
          this.props.deleteEvent(this.props.id)
        }}
      >
          Delete
      </button>
    </div>
    )
  }
}

export default Form;