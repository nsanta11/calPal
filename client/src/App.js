import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
//components
import CalendarWrapper from "./components/CalendarWrapper";
import FormWrapper from "./components/FormWrapper";
import Login from "./components/Login";
import Navbar from "./components/navbar";
import Signup from "./components/Signup"
import './App.css';
import LoginForm from './components/Login';

class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null
    }

    this.getUser = this.getUser.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.updateUser = this.updateUser.bind(this)
  }

  componentDidMount() {
    this.getUser()
  }

  updateUser (userObject) {
    this.setState(userObject)
  }

  getUser() {
    axios.get('/user/').then(response => {
      console.log('Get user response: ')
      console.log(response.data)
      if (response.data.user) {
        console.log('Get User: There is a user saved in the server session: ')

        this.setState({
          loggedIn: true,
          username: response.data.user.username
        })
      } else {
        console.log('Get user: no user');
        this.setState({
          loggedIn: false,
          username: null
        })
      }
    })
  }


  render() {
    return (
      <div className="App">

        <Navbar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
        {this.state.loggedIn &&
          <p>Join the party, {this.state.username}!</p>
        }
        <Router>
          <div>
            <Route exact path="/calendar" component={CalendarWrapper} />
            <Route exact path="/create" component={FormWrapper} />
            <Route exact path="/" component={Login} />
            <Route
              path="/signup"
              render={() =>
                <Signup />}
            />
            <Route exact path="/login"
              render={() =>
                <LoginForm
                  updateUser={this.updateUser}
                />}
            />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
