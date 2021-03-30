import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SeismographView from './seismograph_view/SeismographView'
import SeismographMenu from './menu/SeismographMenu'

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Mickes seismometer</h1>
          </header>
          <SeismographMenu />
          <Switch>
            <Route path="/:seismometer_id" component={SeismographView}  />
            <Redirect from="/" exact={true} to="/vertical_pendulum" />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
