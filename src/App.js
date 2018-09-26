import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      graphData: []
    }
  }

  componentDidMount() {
    window.WebSocket = window.WebSocket;

    let connection = new WebSocket('ws://127.0.0.1:3000/subscriber');

    connection.onopen = function () {
      console.log("WS connection open");
    };

    connection.onerror = function (error) {
      console.log("WS connection error", error);
    };

    connection.onmessage = function (message) {
      try {
        var json = JSON.parse(message.data);
      } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ',
            message.data);
        return;
      }

      if (json.type === 'post_data') {
        console.log(json.value);
      } else if (json.type === 'history') {
        console.log(json.data);
      } else {
        console.log("Received invalid type: '" + json.type + "'");
      }
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
