import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import CalendarWrapper from "./components/CalendarWrapper";
import FormWrapper from "./components/FormWrapper";
import Login from "./components/Login";
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/calendar" component={CalendarWrapper} />
          <Route exact path="/create" component={FormWrapper} />
          <Route exact path="/" component={Login} />
        </div>
      </Router>
    );
  }
}

export default App;
