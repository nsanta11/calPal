import React from "react";
import { Dropdown, Checkbox, Button } from 'semantic-ui-react';
import './Sidebar.css';
import teams from "./teams";
import {Redirect} from 'react-router-dom'


class Sidebar extends React.Component {

  state = {
    dropdownOptions: [
      {text: 'NFL', value: 'NFL'},
      {text: 'MLB', value: 'MLB'},
      {text: 'NBA', value: 'NBA'},
      {text: 'NHL', value: 'NHL'},
      {text: 'Users Created Content', value: 'UCC'}
    ],
    dropdownPicked: '',
    redirectTo: null
  }

  onChange= (e, res) => {
    const dropdownPicked = res.value;
    console.log(dropdownPicked);
    this.setState({dropdownPicked});
  }

  redirect=(e) => {
    e.preventDefault();
    this.setState({
			redirectTo: `/create`
    });
    console.log(this.state.redirectTo);
  }

  saveSchedule=(e) => {
    e.preventDefault();
    
  }

  // console.log(this.props.titles);
  render() {
    if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
  return (
    <div className="sidebar">
    <div>
      Checkboxes to tooggle schedules visibability on/off here.  Should also create a remove button near each checkbox to permanently remove schedule from user db.
      <Checkbox label={{ children: 'Schedule 1' }} />
    <Checkbox label={{ children: 'Schedule 2' }} />
    <Checkbox label={{ children: 'Schedule 3' }} />  
    </div>
      Dropdown menu of schedules
    <Dropdown placeholder='Schedules' fluid search selection options={this.state.dropdownOptions} onChange = {this.onChange} />
      {this.state.dropdownPicked ==='NFL' ? (<Dropdown placeholder='Teams' fluid search selection options={teams.NFLTeams} onChange={this.props.handleNFLSelection}/>)
      : this.state.dropdownPicked=== `MLB` ? (<Dropdown placeholder='Teams' fluid search selection options={teams.MLBTeams} onChange={this.props.handleMLBSelection}/>)
      : this.state.dropdownPicked=== `NBA` ? (<Dropdown placeholder='Teams' fluid search selection options={teams.NBATeams} onChange={this.props.handleNBASelection}/>)
      : this.state.dropdownPicked===`NHL` ? (<Dropdown placeholder='Teams' fluid search selection options={teams.NHLTeams} onChange={this.props.handleNHLSelection}/>)
      : this.state.dropdownPicked===`UCC` ? (<Dropdown placeholder='Schedules' fluid search selection options={this.props.titles} onChange={this.props.handleCreatedContentSelection} />)
      : <div />
    }
    <Button onClick={this.saveSchedule} className="saveSchedule">Add to calendar</Button>
    <Button onClick={this.redirect} className="toCreate">Create a schedule</Button>
    Anything else we need?
 
    </div>
  )
  }
}

export default Sidebar;