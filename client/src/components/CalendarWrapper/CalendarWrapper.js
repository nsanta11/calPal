import React from "react";
import Calendar from "../Calendar";
import API from "../../utils/API";
import Sidebar from "../Sidebar";
import { Link } from "react-router-dom";
import { Grid } from 'semantic-ui-react';
import moment from "moment";

class CalendarWrapper extends React.Component {
  constructor(props){
    super(props);

    this.handleNFLSelection = this.handleNFLSelection.bind(this);
    this.handleMLBSelection = this.handleMLBSelection.bind(this);
    this.handleNHLSelection = this.handleNHLSelection.bind(this);
    this.handleNBASelection = this.handleNBASelection.bind(this);
    this.handleCreatedContentSelection = this.handleCreatedContentSelection.bind(this);
    this.handleSaveClicked = this.handleSaveClicked.bind(this);

    this.state = {
      fullSchedule: [],
      savedEvents: [],
      NBASchedule: [],
      NHLSchedule: [],
      MLBSchedule: [],
      NFLSchedule: [],
      createdContent: [],
      titles: [],
      currentSelection: {sport: null, team: null},
    }

  }

  componentDidMount(){
    //Get the names of all created schedules to push to created content dropdown
    API.getSchedules()
    .then(data => {
      data.data.map((elem)=>this.setstate=({titles: this.state.titles.push({
        text: elem.title,
        value: elem._id
      })
    }));
    })
    .catch(err => console.log(err));
    const dataToSend = JSON.stringify({itemToSave: this.state.currentSelection, _id: localStorage.getItem("_id")})
    console.log(dataToSend)
    fetch("/api/calendar/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: dataToSend,
    })
    .then(res => res.json())
    .then(data => {
      console.log("woo data:", data)
      // MLB Events
      const MLBEvents = data[0].savedEvents.filter(event => event.sport === "mlb");
      const MLBEventsArr = []
      for (let i = 0; i < MLBEvents.length; i++) {
        MLBEventsArr.push(MLBEvents[i].team);
      }
      // NFL Events
      const NFLEvents = data[0].savedEvents.filter(event => event.sport === "nfl");
      const NFLEventsArr = []
      for (let i = 0; i < NFLEvents.length; i++) {
        NFLEventsArr.push(NFLEvents[i].team);
      }
      // NHL Events
      const NHLEvents = data[0].savedEvents.filter(event => event.sport === "nhl");
      const NHLEventsArr = []
      for (let i = 0; i < NHLEvents.length; i++) {
        NHLEventsArr.push(MLBEvents[i].team);
      }
      // NBA Events
      const NBAEvents = data[0].savedEvents.filter(event => event.sport === "nba");
      const NBAEventsArr = []
      for (let i = 0; i < NBAEvents.length; i++) {
        NBAEventsArr.push(NBAEvents[i].team);
      }
      console.log(MLBEventsArr, NFLEventsArr, NHLEventsArr, NBAEventsArr);
      const fullSportsArr = [
        {
          sport: "mlb",
          teams: MLBEventsArr
        },
        {
          sport: "nfl",
          teams: NFLEventsArr
        },
        {
          sport: "nhl",
          teams: NHLEventsArr
        },
        {
          sport: "nba",
          teams: NBAEventsArr
        }
      ]
      this.renderSavedEvents(fullSportsArr)
    })
  }

  //get schedules from database

// Comment out the API stuff so we don't use the max amount permitted per day unless you are working on it.  Will also need to comment out all references to this in this.state, render and in Sidebar.js
  handleNFLSelection(e, res) {
    console.log("checking res..", res)
    fetch("https://api.mysportsfeeds.com/v1.2/pull/nfl/2017-2018-regular/full_game_schedule.json?team=" + res.value, {
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
          eventMouseover: (event, jsEvent, view) => console.log("event hovered"),
        });
      });
      this.setState({NFLSchedule: gameData, NHLSchedule: [], NBASchedule: [], MLBSchedule: []})
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule)
      this.setState({fullSchedule: fullScheduleTemp, currentSelection: {sport: "nfl", team: res.value}});
      console.log(this.state)
    });
  }    
  handleMLBSelection(e, res) {
    fetch("https://api.mysportsfeeds.com/v1.2/pull/mlb/2017-2018-regular/full_game_schedule.json?team=" + res.value, {
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
          date: new Date(game.date),
          link: 'https://www.mlb.com',
          watch: [`${game.location}, ${game.homeTeam.city}`],
          info: '',
          eventMouseover: (event, jsEvent, view) => console.log("event hovered")
        });
      });
      this.setState({MLBSchedule: gameData, NHLSchedule: [], NBASchedule: [], NFLSchedule: [] })
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule)
      this.setState({fullSchedule: fullScheduleTemp, currentSelection: {sport: "mlb", team: res.value}});
      console.log(this.state)
    }); 
  }    
  handleNHLSelection(e, res) {
    fetch("https://api.mysportsfeeds.com/v1.2/pull/nhl/2017-2018-regular/full_game_schedule.json?team=" + res.value, {
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
      this.setState({NHLSchedule: gameData, MLBSchedule: [], NBASchedule: [], NFLSchedule: []})
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule)
      this.setState({fullSchedule: fullScheduleTemp, currentSelection: {sport: "nhl", team: res.value}});
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
      this.setState({NBASchedule: gameData, NHLSchedule: [], MLBSchedule: [], NFLSchedule: []})
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule)
      this.setState({fullSchedule: fullScheduleTemp, currentSelection: {sport: "nba", team: res.value}});
      console.log(this.state)
    })
  }    
  
  renderSavedEvents(searchArr) {
    console.log(searchArr);
    searchArr.forEach(sport => {
      if (sport.teams.length > 0) {
        console.log("searching:", sport);
        const URL = `https://api.mysportsfeeds.com/v1.2/pull/${sport.sport}/2017-2018-regular/full_game_schedule.json?team=${sport.teams.join(',')}`
        fetch(URL, {
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
            });
          });
          this.setState({fullSchedule: this.state.fullSchedule.concat(gameData)});
          console.log("state:", this.state)
        })
      }
    })
  }
  
  handleCreatedContentSelection(event, res){
    const _id = res.value;
    API.getSchedules()
    .then(data => {
      const createdContent = [];
      let schedule = data.data.filter((elem)=> _id === elem._id);
      schedule[0].savedEvents.map((elem) => {
        createdContent.push(elem);
        console.log(elem.date);
        let tempDate = moment.utc(elem.date);
        console.log(tempDate);
        elem.date = tempDate._d;
        console.log(elem.date);
      });
      if(!this.state.createdContent.includes(createdContent)) {
        this.setState({createdContent: this.state.createdContent.push(createdContent)});
        // console.log(this.state.createdContent);
        const fullSchedule = this.state.fullSchedule.concat(createdContent);
        this.setState({fullSchedule: fullSchedule, currentSelection: {sport: "ucc", team: res.value}});
        console.log(this.state.fullSchedule);
      }
    })
    .catch(err =>err);
  }

  handleSaveClicked(e) {
    e.preventDefault();
    console.log("clicked");
    console.log(localStorage.getItem("_id"));
    const dataToSend = JSON.stringify({itemToSave: this.state.currentSelection, _id: localStorage.getItem("_id")})
    console.log(dataToSend)
    fetch("/api/calendar/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: dataToSend,
    })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))
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
                clicked={this.handleSaveClicked}
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