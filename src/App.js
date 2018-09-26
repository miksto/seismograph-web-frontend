import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Graph from './graph/Graph'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Mickes seismometer</h1>
        </header>
        < Graph />
      </div>
    );
  }
}

export default App;
