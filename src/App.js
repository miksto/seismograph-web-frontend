import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import moment from 'moment';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Menu from './menu/Menu'
import Home from './home/Home'
import Hourly from './hourly/Hourly'

class App extends Component {
  render() {
    let current_utc_time = moment.utc().format("HH:mm")

    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Mickes seismometer</h1>
          </header>
          <Menu/>
          <h2>Utc time: {current_utc_time}</h2>
          <Route exact={true} path="/" component={Home} />
          <Route path="/hourly" component={Hourly} />
        </div>
      </Router>
    );
  }
}

export default App;
