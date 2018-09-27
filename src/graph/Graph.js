import React, { Component } from 'react';
import './Graph.css';
import {Line} from "react-chartjs"

class Graph extends Component {
  
  constructor() {
    super();
    this.state = {
      graphData: []
    }
  }

  componentDidMount() {
    window.WebSocket = window.WebSocket;

    let connection = new WebSocket('ws://46.101.184.224:3000/subscriber');

    connection.onopen = () => {
        console.log("WS connection open");
    };

    connection.onerror = (error) => {
        console.log("WS connection error", error);
    };

    connection.onmessage = (message) => {
      try {
        var json = JSON.parse(message.data);
      } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ', message.data);
        return;
      }

      if (json.type === 'post_data') {

        this.setState(
          prevState => ({
            graphData: [...prevState.graphData, json.value].slice(-500)
          })
        )
      } else if (json.type === 'history') {
        console.log(json.data);
        this.setState({graphData: json.data});
      } else {
        console.log("Received invalid type: '" + json.type + "'");
      }
    };
  }

  createChartData() {
    return {
      labels: this.state.graphData.map(()=>""),
      datasets: [
        {
          data: this.state.graphData
        }
      ]
    };
  }

  createChartOptions() {
    return {
      animation: false,
      bezierCurve : false,
      bezierCurveTension : 0.0,
      scaleShowGridLines : false,
      pointDot : false,
      datasetFill : false,
      responsive: true,
      maintainAspectRatio: false,
      showTooltips: false,
    }
  }

  render() {
    return (
      <div className="Graph">
        <Line
          data={this.createChartData()}
          options={this.createChartOptions()}
        />
      </div>
    );
  }
}
export default Graph;