import React, { Component } from 'react';
import './Graph.css';
import {Line} from "react-chartjs"

class Graph extends Component {
  
  constructor() {
    super();
    this.state = {
      graphData: [],
      historicData: [],
      tempData: [],
      stats: {}
    }
  }

  componentDidMount() {
    window.WebSocket = window.WebSocket;
    const historySize = 500;
    const graphSize = 500;
    const batchUpdateSize = 10;
    
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
        if (this.state.tempData.length === batchUpdateSize) {
          const avg = this.state.graphData.reduce((sum, b) => (sum + b)) / this.state.graphData.length;
          const squareDiffSum = this.state.graphData.reduce((sum, a) => (sum + (a-avg)*(a-avg)));
          const std = Math.sqrt(squareDiffSum / this.state.graphData.length);
          
          this.setState(
            prevState => ({
              graphData: [...prevState.graphData, ...this.state.tempData].slice(-graphSize),
              historicData: [...prevState.historicData, ...prevState.graphData.slice(0, batchUpdateSize)].slice(-historySize),
              tempData: [],
              stats: {
                avg,
                std,
                squareDiffSum
              }
            })
          )
        } else {
          this.setState(
            prevState => ({
              tempData: [...prevState.tempData, json.value]
            })
          )
        }
      } else if (json.type === 'history') {
        this.setState({
          graphData: json.data.slice(-graphSize),
          historicData: json.data.slice(0, json.data.length - graphSize)
        });
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
      <div className="Graph">
        <Line
          data={this.createChartData(this.state.graphData)}
          options={this.createChartOptions()}
        />
        <Line
          data={this.createChartData(this.state.historicData)}
          options={this.createChartOptions()}
        />
        <p>
          Avg: {this.state.stats.avg}<br/>
          Std: {this.state.stats.std}<br/>
          squareDiffSum: {this.state.stats.squareDiffSum}<br/>
        </p>
      </div>
    );
  }
}
export default Graph;