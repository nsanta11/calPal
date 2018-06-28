import React from "react";

class Form extends React.Component {
  state = {
    Watch: [<input name= "watch"></input>]
  }


  addWatch = event => {
    event.preventDefault();
    const Watch = this.state.Watch;
    this.setState({Watch: Watch.concat(<input name= "watch"></input>)});
    console.log(this.state.Watch);
  }


  render() {
  return (
    <div className="Form">
      Event Name: <input name="eventName" />
      Date: <input name="date" />
      Time: <input name="time" />
      Where to Watch? {this.state.Watch}
      <button onClick={this.addWatch}>+ location</button>
      Website: <input name="website" />
      Additional Information:
      <textarea name="addInfo"/>
      <button>Delete</button>
    </div>
    )
  }
}

export default Form;