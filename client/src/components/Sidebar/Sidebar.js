import React from "react";
import { Dropdown, Search, Checkbox } from 'semantic-ui-react';
import './Sidebar.css';
import teams from "./teams";

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      Dropdown menu of schedules
    <Dropdown placeholder='NFL' fluid search selection options={teams.NFLTeams} onChange={props.handleNFLSelection}/>
    <Dropdown placeholder='MLB' fluid search selection options={teams.MLBTeams} onChange={props.handleMLBSelection}/>
    <Dropdown placeholder='NBA' fluid search selection options={teams.NBATeams} onChange={props.handleNBASelection}/>
    <Dropdown placeholder='NHL' fluid search selection options={teams.NHLTeams} onChange={props.handleNHLSelection}/>

    Search bar of schedules

          <Search
            // loading={isLoading}
            // onResultSelect={this.handleResultSelect}
            // onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            // results={results}
            // value={value}
            // {...this.props}
          />
        
    Checkboxes to toggle schedules on/off.  Can easily make these using a .map loop
    <Checkbox label={{ children: 'Schedule 1' }} />
    <Checkbox label={{ children: 'Schedule 2' }} />
    <Checkbox label={{ children: 'Schedule 3' }} />    

  
    SIDEBAR
    SIDEBAR
    SIDEBAR
    SIDEBAR
    SIDEBAR
    SIDEBAR
    SIDEBAR
    SIDEBAR
    SIDEBAR
    SIDEBAR
    SIDEBAR
    SIDEBAR
    </div>
  )
}

export default Sidebar