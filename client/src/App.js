import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CalendarWrapper from "./components/CalendarWrapper";
import Calendar from "./components/Calendar";
import FormWrapper from "./components/FormWrapper";
import Login from "./components/Login";
import './App.css';
import TestButtons from "./components/TestButtons"

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/calendar/:id" component={Calendar} />
          <Route exact path="/create" component={FormWrapper} />
          <Route exact path="/" component={Login} />
        </div>
      </Router>
    );
  }

  componentDidMount() {
    // console.log(this.props)
  }
}

export default App;
