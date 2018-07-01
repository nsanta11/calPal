import React from "react";

class Form extends React.Component {
  state = {
    Watch: [<input name= "watch" key="watch0"  arrayPos={0} onchange={this.handleChange}/>], //this is to add multiple watch locations
    _Events: {},
    title: "",
    date: "",
    time: "",
    link: "",
    info: "",
    watch: []
  }

  //onClick event to add multiple watch locations
  addWatch = event => {
    event.preventDefault();
    const Watch = this.state.Watch;
    this.setState({Watch: Watch.concat(<input name="watch" arrayPos={Watch.length} key={`watch${Watch.length}`}></input>)});
    console.log(this.state.Watch);
  }

  handleInputChange = event => {
    const name = event.target.name;
    let value = event.target.value;
    if(name.startsWith("watch")) {
      const i = event.target.arrayPos;
      
    }
    this.setState({[name]: value});
    
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