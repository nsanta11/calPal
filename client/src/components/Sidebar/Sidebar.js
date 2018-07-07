import React from "react";
import { Dropdown, Search, Checkbox } from 'semantic-ui-react'

const Sidebar = () => {
  return (
    <div>
      Dropdown menu of schedules
    <Dropdown placeholder='Select Schedule' fluid search selection options='a, b, c' />

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