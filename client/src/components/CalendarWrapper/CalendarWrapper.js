import React from "react";
import Calendar from "../Calendar";
import API from "../../utils/API";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import { Grid } from 'semantic-ui-react';

class CalendarWrapper extends React.Component {
  constructor(props){
    super(props);

    this.handleNFLSelection = this.handleNFLSelection.bind(this);
    this.handleMLBSelection = this.handleMLBSelection.bind(this);
    this.handleNHLSelection = this.handleNHLSelection.bind(this);
    this.handleNBASelection = this.handleNBASelection.bind(this);
    this.handleCreatedContentSelection = this.handleCreatedContentSelection.bind(this);

    this.state = {
      fullSchedule: [],
      NBASchedule: [],
      NHLSchedule: [],
      MLBSchedule: [],
      NFLSchedule: [],
      createdContent: [],
      titles: []
    }

  }

  componentWillMount(){
    //Get the names of all created schedules to push to created content dropdown
    API.getSchedules()
    .then(data => {
      console.log(data.data);
      data.data.map((elem)=>this.setstate=({titles: this.state.titles.push({
        text: elem.title,
        value: elem._id
      })
    }));
      console.log(this.state.titles);
    })
    .catch(err => console.log(err));
  }
// Comment out the API stuff so we don't use the max amount permitted per day unless you are working on it.  Will also need to comment out all references to this in this.state, render and in Sidebar.js
  handleNFLSelection(e, res) {
    fetch("https://api.mysportsfeeds.com/v1.2/pull/nfl/2018-2019-regular/full_game_schedule.json?team=" + res.value, {
      method: "GET",
      headers: {
        "Authorization": "Basic " + btoa("cdplourde:Pass4Class")
      }
    })
    .then(result => result.json())
    .then(data => {
      const gameData = data.fullgameschedule.gameentry.map(game => {
        return({
          title: `${game.homeTeam.Name} vs ${game.awayTeam.Name}`,
          allDay: false,
          start: new Date(game.date),
          eventMouseover: (event, jsEvent, view) => console.log("event hovered")
        });
      });
      this.setState({NFLSchedule: gameData})
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule)
      this.setState({fullSchedule: fullScheduleTemp});
      console.log(this.state)
    });
  }    
  handleMLBSelection(e, res) {
    fetch("https://api.mysportsfeeds.com/v1.2/pull/mlb/2018-2019-regular/full_game_schedule.json?team=" + res.value, {
      method: "GET",
      headers: {
        "Authorization": "Basic " + btoa("cdplourde:Pass4Class")
      }
    })
    .then(result => result.json())
    .then(data => {
      const gameData = data.fullgameschedule.gameentry.map(game => {
        return({
          title: `${game.homeTeam.Name} vs ${game.awayTeam.Name}`,
          allDay: false,
          start: new Date(game.date),
          eventMouseover: (event, jsEvent, view) => console.log("event hovered")
        });
      });
      this.setState({MLBSchedule: gameData})
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule)
      this.setState({fullSchedule: fullScheduleTemp});
      console.log(this.state)
    }); 
  }    
  handleNHLSelection(e, res) {
    fetch("https://api.mysportsfeeds.com/v1.2/pull/nhl/2018-2019-regular/full_game_schedule.json?team=" + res.value, {
      method: "GET",
      headers: {
        "Authorization": "Basic " + btoa("cdplourde:Pass4Class")
      }
    })
    .then(result => result.json())
    .then(data => {
      const gameData = data.fullgameschedule.gameentry.map(game => {
        return({
          title: `${game.homeTeam.Name} vs ${game.awayTeam.Name}`,
          allDay: false,
          start: new Date(game.date),
          eventMouseover: (event, jsEvent, view) => console.log("event hovered")
        });
      });
      this.setState({NHLSchedule: gameData})
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule)
      this.setState({fullSchedule: fullScheduleTemp});
      console.log(this.state)
    }); 
  }    
  handleNBASelection(e, res) {
    fetch("https://api.mysportsfeeds.com/v1.2/pull/nba/2017-2018-regular/full_game_schedule.json?team=" + res.value, {
      method: "GET",
      headers: {
        "Authorization": "Basic " + btoa("cdplourde:Pass4Class")
      }
    })
    .then(result => result.json())
    .then(data => {
      console.log(data)
      const gameData = data.fullgameschedule.gameentry.map(game => {
        return({
          title: `${game.homeTeam.Name} vs ${game.awayTeam.Name}`,
          allDay: false,
          start: new Date(game.date),
          eventMouseover: (event, jsEvent, view) => console.log("event hovered")
        });
      });
      this.setState({NBASchedule: gameData})
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule)
      this.setState({fullSchedule: fullScheduleTemp});
      console.log(this.state)
    }); 
  }    
  
  
  handleCreatedContentSelection(event, res){
    const _id = res.value;
    console.log(res);
    API.getSchedules()
    .then(data => {
      const createdContent = [];
      let schedule = data.data.filter((elem)=> _id === elem._id);
      schedule[0].savedEvents.map((elem) => createdContent.push(elem));
      if(!this.state.createdContent.includes(createdContent)) {
      this.setState({createdContent: this.state.createdContent.push(createdContent)});
      console.log(this.state.createdContent);
      const fullSchedule = this.state.fullSchedule.concat(createdContent);
      this.setState({fullSchedule});
      console.log(this.state.fullSchedule);
      }
    })
    .catch(err =>err);
  }

  render() {
    return(
      <div >
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Sidebar 
                handleNBASelection={this.handleNBASelection} 
                handleNHLSelection={this.handleNHLSelection} 
                handleNFLSelection={this.handleNFLSelection} 
                handleMLBSelection={this.handleMLBSelection}
                handleCreatedContentSelection={this.handleCreatedContentSelection} 
                titles={this.state.titles}/>
            </Grid.Column>
            <Grid.Column width={12}>
              <Calendar onScheduleChange={this.state.fullSchedule}/> 
           </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  };


};

export default CalendarWrapper;