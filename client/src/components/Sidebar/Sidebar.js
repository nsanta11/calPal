import React from "react";
import { Dropdown, Checkbox } from 'semantic-ui-react';
import './Sidebar.css';
import teams from "./teams";

class Sidebar extends React.Component {

  state = {
    dropdownOptions: [
      {text: 'NFL', value: 'NFL'},
      {text: 'MLB', value: 'MLB'},
      {text: 'NBA', value: 'NBA'},
      {text: 'NHL', value: 'NHL'},
      {text: 'Users Created Content', value: 'UCC'}
    ],
    dropdownPicked: ''
  }

  onChange= (e, res) => {
    const dropdownPicked = res.value;
    console.log(dropdownPicked);
    this.setState({dropdownPicked});
  }

  // console.log(this.props.titles);
  render() {
  return (
    <div className="sidebar">
      Dropdown menu of schedules
    <Dropdown placeholder='Schedules' fluid search selection options={this.state.dropdownOptions} onChange = {this.onChange} />
      {this.state.dropdownPicked ==='NFL' ? (<Dropdown placeholder='Teams' fluid search selection options={teams.NFLTeams} onChange={this.props.handleNFLSelection}/>)
      : this.state.dropdownPicked=== `MLB` ? (<Dropdown placeholder='Teams' fluid search selection options={teams.MLBTeams} onChange={this.props.handleMLBSelection}/>)
      : this.state.dropdownPicked=== `NBA` ? (<Dropdown placeholder='Teams' fluid search selection options={teams.NBATeams} onChange={this.props.handleNBASelection}/>)
      : this.state.dropdownPicked===`NHL` ? (<Dropdown placeholder='Teams' fluid search selection options={teams.NHLTeams} onChange={this.props.handleNHLSelection}/>)
      : this.state.dropdownPicked===`UCC` ? (<Dropdown placeholder='Schedules' fluid search selection options={this.props.titles} onChange={this.props.handleCreatedContentSelection} />)
      : <div />
    }
    Search bar of schedules

          {/* <Search
            // loading={isLoading}
            // onResultSelect={this.handleResultSelect}
            // onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            // results={results}
            // value={value}
            // {...this.this.props}
          /> */}
        
    Checkboxes to toggle schedules on/off.  Can easily make these using a .map loop
    <Checkbox label={{ children: 'Schedule 1' }} />
    <Checkbox label={{ children: 'Schedule 2' }} />
    <Checkbox label={{ children: 'Schedule 3' }} />   
    </div>
  )
  }
}

export default Sidebar;