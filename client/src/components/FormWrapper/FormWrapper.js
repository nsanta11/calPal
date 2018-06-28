import React from "react";
import Form from "../Form";

class FormWrapper extends React.Component {
  state = {
    numForms: 0,
    Forms: []
  }

  
  //methods to save all form info to database
  //This will tie in the SAVE button

  //Create additional event forms
  moreEvents = event => {
    //might want to insert a unique schedule name check here so no forms appear until it is unique.  If not, start with one event form
    event.preventDefault();
    const Forms = this.state.Forms;
    this.setState({Forms: Forms.concat(<Form 
      key={Forms.length}
    />)});
    console.log(this.state.Forms);
  }

  render() {
    return ( 
      <div id = "FormWrapper" >
        <h1>Create a new schedule</h1>
        <form>
          Schedule Name: <input name="scheduleName"></input> <br />
          <input type="radio" id="public" name="pub-priv" checked />
          <label for="public">Public</label> <br />
          <input type="radio" id="private" name="pub-priv" />
          <label for="private">Private</label> <br />
          <p>Give the following people administrative access: <br />
          (seperate emails with a space or press enter after each one)</p>
          <textarea />
          <br />
          {this.state.Forms}
          <button 
            className="moreEvents"
            onClick={this.moreEvents}
            >
              + Event
          </button>
          <p>Include the emails of anybody you would like to share this calendar with.  This is the only way other users may find a private calendar.
          (seperate emails with a space or press enter after each one)</p>
          <textarea name="shareList" />
          <button className="saveSched">Save and Publish</button>
        </form>
      </div>
    )
  }
}

export default FormWrapper;

