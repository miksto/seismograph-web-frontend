import React, { Component } from 'react';
import './Graph.css';
import {Line} from "react-chartjs-2"

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
    const graphSize = 15*20; // 15 samples per second times 20 second
    let webSocketUrl = 'ws://' + process.env.REACT_APP_API_ENDPOINT + '/ws/web-client';
    let connection = new WebSocket(webSocketUrl);

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
        const newGraphData = [...this.state.graphData, ...json.values].slice(-graphSize);
        let avg = 0;
        let std = 0;
        
        if (newGraphData.length > 0) {
          avg = newGraphData.reduce((sum, b) => (sum + b), 0) / newGraphData.length;
          const squareDiffSum = newGraphData.reduce((sum, a) => (sum + (a-avg)*(a-avg)), 0);
          std = Math.sqrt(squareDiffSum / newGraphData.length);
        }
        this.setState(
          prevState => ({
            graphData: newGraphData,
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
      animation: true,
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      elements: {
        line: {
          fill: false,
          tension: 0.0,
          borderWidth: 2
        },
        point: {
            radius: 0
        }
      },
      fill: false,
      scales: {
        xAxes: [{
            gridLines: {
                display:false
            }
        }],
        yAxes: [{
            gridLines: {
                display:false
            }   
        }]
      },
      datasetFill : false,
    }
  }

  render() {
    let display_avg = this.state.stats.avg ? this.state.stats.avg.toFixed(2) : 0
    let display_std = this.state.stats.std ? (this.state.stats.std).toFixed(2) : 0
    let display_cv = ((this.state.stats.std / 8192)*1000).toFixed(2)

    return (
      <div className="graph_wrapper">
        <div className="graph">
          <Line
            data={this.createChartData(this.state.graphData)}
            options={this.createChartOptions()}
          />
        </div>
        <p className="graph_data">
          Avg: {display_avg}<br/>
          Std: {display_std}<br/>
          mCV: {display_cv} 
        </p>
      </div>
    );
  }
}
export default Graph;