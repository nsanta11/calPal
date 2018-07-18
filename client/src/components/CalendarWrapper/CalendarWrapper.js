import React from "react";
import Calendar from "../Calendar";
import API from "../../utils/API";
import Sidebar from "../Sidebar";
import { Grid } from 'semantic-ui-react';
import moment from "moment-timezone";
import teams from "../../utils/teams";

class CalendarWrapper extends React.Component {
  constructor(props){
    super(props);

    this.handleNFLSelection = this.handleNFLSelection.bind(this);
    this.handleMLBSelection = this.handleMLBSelection.bind(this);
    this.handleNHLSelection = this.handleNHLSelection.bind(this);
    this.handleNBASelection = this.handleNBASelection.bind(this);
    this.handleCreatedContentSelection = this.handleCreatedContentSelection.bind(this);
    this.handleSaveClicked = this.handleSaveClicked.bind(this);
    this.handleCheckBox = this.handleCheckBox.bind(this);

    this.state = {
      checkBox: [],
      fullSchedule: [],
      hideSchedule: [],
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
    console.log(this.state.titles);
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
        NHLEventsArr.push(NHLEvents[i].team);
      }
      // NBA Events
      const NBAEvents = data[0].savedEvents.filter(event => event.sport === "nba");
      const NBAEventsArr = []
      for (let i = 0; i < NBAEvents.length; i++) {
        NBAEventsArr.push(NBAEvents[i].team);
      }
      //User Created Events
      const UCCEvents = data[0].savedEvents.filter(event => event.sport === "ucc");
      const UCCEventsArr = []
      for (let i = 0; i < UCCEvents.length; i++) {
        UCCEventsArr.push(UCCEvents[i].team);
      }
      console.log(MLBEventsArr, NFLEventsArr, NHLEventsArr, NBAEventsArr, UCCEventsArr);
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
        },
        {
          sport: "ucc",
          teams: UCCEventsArr
        }
      ]
      this.renderSavedEvents(fullSportsArr)
    })
  }

  renderSavedEvents(searchArr) {
    console.log(searchArr);
    searchArr.forEach(sport => {
      if(sport.sport !== "ucc") {
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
            console.log(data)
            const gameData = data.fullgameschedule.gameentry.map(game => {
              return({
                title: `${game.homeTeam.Name} vs ${game.awayTeam.Name}`,
                allDay: false,
                start: this.convertTimeZone(game.date, game.time),
                link: `https://www.${sport.sport}.com`,
                watch: [`${game.location}, ${game.homeTeam.City}`],
                info: '',
                schedID: sport.teams
              });
            });
            console.log(sport.teams);
            sport.teams.map((team) => {
            const league = sport.sport.toUpperCase() + "Teams";
            const teamName = teams[league].filter(x => x.value === team);
            const checkBoxData = {
              _id: sport.teams,
              name: teamName[0].text,
            };
            this.setState({fullSchedule: this.state.fullSchedule.concat(gameData), checkBox: this.state.checkBox.concat(checkBoxData)});
            console.log("state:", this.state);
            return('');
          });
          })
        }
      } else {
        if(sport.teams.length > 0) {
          console.log("searching:", sport);
          sport.teams.map(team => {
          API.getSchedules()
          .then(data => {
            let schedule = data.data.filter((elem)=> team === elem._id);
            const checkBoxData = {
            _id: schedule[0]._id,
            name: schedule[0].title,
          };
            const createdContent = schedule[0].savedEvents.map((elem) => {
              let tempDate = moment.utc(elem.date);
              return({
                title: elem.title,
                allDay: false,
                start: tempDate._d,
                link: elem.link,
                watch: elem.watch,
                info: elem.info,
                schedID: schedule[0]._id
              })
          });
            this.setState({fullSchedule: this.state.fullSchedule.concat(createdContent), checkBox: this.state.checkBox.concat(checkBoxData)});
            console.log(this.state);
          })
          .catch(err => console.log(err));
          return('');
          });
        }
      }
    })
  }

  //get schedules from database
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
          start: this.convertTimeZone(game.date, game.time),
          link: 'https://www.mlb.com',
          watch: [`${game.location}, ${game.homeTeam.City}`],
          info: '',
          schedID: res.value
        });
      });
      this.setState({NFLSchedule: gameData, NHLSchedule: [], NBASchedule: [], MLBSchedule: []})
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule)
      this.setState({fullSchedule: this.state.fullSchedule.concat(fullScheduleTemp), currentSelection: {sport: "nfl", team: res.value}});
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
          start: this.convertTimeZone(game.date, game.time),
          link: 'https://www.mlb.com',
          watch: [`${game.location}, ${game.homeTeam.City}`],
          info: '',
          schedID: res.value
        });
      });
      this.setState({MLBSchedule: gameData, NHLSchedule: [], NBASchedule: [], NFLSchedule: [] })
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule)
      this.setState({fullSchedule: this.state.fullSchedule.concat(fullScheduleTemp), currentSelection: {sport: "mlb", team: res.value}});
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
          start: this.convertTimeZone(game.date, game.time),
          link: 'https://www.nhl.com',
          watch: [`${game.location}, ${game.homeTeam.City}`],
          info: '',
          schedID: res.value
        });
      });
      this.setState({NHLSchedule: gameData, MLBSchedule: [], NBASchedule: [], NFLSchedule: []})
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule)
      this.setState({fullSchedule: this.state.fullSchedule.concat(fullScheduleTemp), currentSelection: {sport: "nhl", team: res.value}});
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
          start: this.convertTimeZone(game.date, game.time),
          link: 'https://www.nba.com',
          watch: [`${game.location}, ${game.homeTeam.City}`],
          info: '',
          schedID: res.value
        });
      });
      this.setState({NBASchedule: gameData, NHLSchedule: [], MLBSchedule: [], NFLSchedule: []})
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule)
      this.setState({fullSchedule: this.state.fullSchedule.concat(fullScheduleTemp), currentSelection: {sport: "nba", team: res.value}});
      console.log(this.state)
    })
  }    
  
  handleCreatedContentSelection(event, res){
    const _id = res.value;
    API.getSchedules()
    .then(data => {
      const schedule = data.data.filter((elem)=> _id === elem._id);
      const createdContent = schedule[0].savedEvents.map((elem) => {
        console.log(elem);
        const tempDate = moment.utc(elem.date);
        return({
          title: elem.title,
          allDay: false,
          date: tempDate._d,
          link: elem.link,
          watch: elem.watch,
          info: elem.info,
          _id: elem._id,
          schedID: _id
        });
      });
      console.log(createdContent);
      this.setState({createdContent: createdContent, NBASchedule: [], NHLSchedule: [], MLBSchedule: [], NFLSchedule: []})
      const fullScheduleTemp = this.state.NBASchedule.concat(this.state.NHLSchedule, this.state.MLBSchedule, this.state.NFLSchedule, this.state.createdContent)
      this.setState({fullSchedule: this.state.fullSchedule.concat(fullScheduleTemp), currentSelection: {sport: "ucc", team: _id}});
      console.log(this.state);
    })
    .catch(err =>err);
  }

  handleSaveClicked(e) {
    e.preventDefault();
    console.log("clicked");
    console.log(localStorage.getItem("_id"));
    const dataToSend = JSON.stringify({itemToSave: this.state.currentSelection, _id: localStorage.getItem("_id")})
    console.log(dataToSend)
    fetch("/api/calendar/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        // "Content-Type": "application/x-www-form-urlencoded",
      },
      body: dataToSend,
    })
    .then(res => res.json())
    .catch(err => console.log(err));
    const league = this.state.currentSelection.sport;
    const team = this.state.currentSelection.team
    if(league !== "ucc") {
      const lleague = league.toUpperCase() + 'Teams'
      const teamName = teams[lleague].filter(x => x.value === team);
      const checkBoxData = {
        _id: team,
        name: teamName[0].text,
      };
      this.setState({checkBox: this.state.checkBox.concat(checkBoxData)});
    } else {
      const teamName = this.state.titles.filter(x => x.value === team)
      const checkBoxData = {
        _id: team,
        name: teamName[0].text,
          };
      this.setState({checkBox: this.state.checkBox.concat(checkBoxData)});
    }
  }

  handleCheckBox = (_id) => {
    let fullSchedule = this.state.fullSchedule;
    let hideSchedule = this.state.hideSchedule;
    const toHideSchedule = fullSchedule.filter(x => x.schedID === _id);
    const toShowSchedule = hideSchedule.filter(x => x.schedID === _id);
    fullSchedule = fullSchedule.filter(x => x.schedID !== _id);
    hideSchedule = hideSchedule.filter(x => x.schedID !== _id);
    const hideThese = [...hideSchedule, ...toHideSchedule];
    const showThese = [...fullSchedule, ...toShowSchedule];
    this.setState({fullSchedule: showThese, hideSchedule: hideThese}, () => {
  });
  }

  convertTimeZone = (date, time) => {
    const dateTime = date + " " + time;
    const newDateTime = moment(dateTime, "YYYY-MM-DD h:mmA").format("YYYY-MM-DD HH:mm:ss");
    const nyTime = moment.tz(newDateTime, "America/New_York");
    const guessTZ = moment.tz.guess();
    const myTime = nyTime.clone().tz(guessTZ);
    return(myTime.format())
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
                titles={this.state.titles}
                checkBox={this.state.checkBox}
                handleCheckBox={this.handleCheckBox}
              />
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