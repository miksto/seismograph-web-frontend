import React, { Component } from 'react';
import './Graph.css';
import {Line} from "react-chartjs"

class Graph extends Component {
  
  constructor() {
    super();
    this.state = {
      graphData: [],
      stats: {}
    }
  }

  componentDidMount() {
    window.WebSocket = window.WebSocket;
    const graphSize = 200;
    
    let connection = new WebSocket('ws://46.101.184.224:3000/web-client');

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

      if (json.type === 'data') {
        let avg = 0;
        let std = 0;
        
        if (this.state.graphData.length > 0) {
          avg = this.state.graphData.reduce((sum, b) => (sum + b)) / this.state.graphData.length;
          const squareDiffSum = this.state.graphData.reduce((sum, a) => (sum + (a-avg)*(a-avg)));
          std = Math.sqrt(squareDiffSum / this.state.graphData.length);
        }

        this.setState(
          prevState => ({
            graphData: [...prevState.graphData, ...json.values].slice(-graphSize),
            stats: {
              avg,
              std
            }
          })
        );
      } else {
        console.log("Received invalid type: '" + json.type + "'");
      }
    };
  }

  createChartData(data) {
    return {
      labels: data.map(()=>""),
      datasets: [
        {
          data: data
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
      showTooltips: false
    }
  }

  render() {
    return (
      <div className="graph_wrapper">
        <div className="graph">
          <Line
            data={this.createChartData(this.state.graphData)}
            options={this.createChartOptions()}
          />
        </div>
        <p className="graph_data">
          Avg: {this.state.stats.avg}<br/>
          Std: {this.state.stats.std}
        </p>
      </div>
    );
  }
}
export default Graph;