import React, { Component } from 'react';
import './Graph.css';
import {Line} from "react-chartjs-2"

class Graph extends Component {
  
  constructor() {
    super();
    this.state = {
      graphData: [],
      stats: {}
    };
  }

  componentDidMount() {
    this.allowWebSocketReconnect = true;
    this.setupWebSocket();
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.seismometer_id !== prevProps.seismometer_id) {
      this.websocket.close();
      this.setupWebSocket();
    }
  }

  componentWillUnmount() {
    this.allowWebSocketReconnect = false;
    this.websocket.close();
    this.websocket = null;
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

  setupWebSocket() {
    const seismometer_id = this.props.seismometer_id;
    let webSocketUrl = process.env.REACT_APP_WS_SCHEME + process.env.REACT_APP_API_ENDPOINT 
        + '/ws/web-client?seismometer_id=' + seismometer_id + "&history_length=" + this.props.graph_length;
    this.websocket = new WebSocket(webSocketUrl);

    this.websocket.onopen = () => {
        console.log("WS connection open for: " + seismometer_id);
    };

    this.websocket.onclose = () => {
      console.log("WS connection closed for: " + seismometer_id);
      if (this.allowWebSocketReconnect && seismometer_id === this.props.seismometer_id) {
        setTimeout(() => {
          this.setupWebSocket()
        }, 1000);
      }
    };

    this.websocket.onerror = (error) => {
        console.log("WS connection error for: " + seismometer_id, error);
    };

    this.websocket.onmessage = (message) => {
      console.log("WS onmessage for: " + seismometer_id);
      try {
        var json = JSON.parse(message.data);
      } catch (e) {
        console.log('This doesn\'t look like a valid JSON: ', message.data);
        return;
      }

      if (json.type === 'data') {
        this.updateGraphData(json);
      } else {
        console.log("Received invalid type: '" + json.type + "'");
      }
    };
  }
  
  updateGraphData(json) {
    const graphSize = json.stats.decimated_sampling_rate * this.props.graph_length
    const newGraphData = [...this.state.graphData, ...json.values].slice(-graphSize);
    let graph_avg = 0;
    let std = 0;
    
    if (newGraphData.length > 0) {
      graph_avg = newGraphData.reduce((sum, b) => (sum + b), 0) / newGraphData.length;
      const squareDiffSum = newGraphData.reduce((sum, a) => (sum + (a-graph_avg)*(a-graph_avg)), 0);
      std = Math.sqrt(squareDiffSum / newGraphData.length);
    }
    this.setState({
      graphData: newGraphData,
      stats: {
        ...json.stats,
        std,
        graph_avg
      }
    });
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
    let display_graph_avg = 0;
    let display_batch_avg = 0;
    let display_std = 0;
    let display_cv = 0;
    let display_rolling_avg = 0;
    let display_actual_sample_rate = 0;

    if (this.state.stats.batch_avg !== undefined) {
      display_graph_avg = this.state.stats.graph_avg.toFixed(2);
      display_batch_avg = this.state.stats.batch_avg.toFixed(2);
      display_rolling_avg = this.state.stats.rolling_avg.toFixed(2);
      display_std = this.state.stats.std.toFixed(2);
      display_cv = ((this.state.stats.std / this.state.stats.rolling_avg)*1000).toFixed(2);
      display_actual_sample_rate = this.state.stats.actual_sampling_rate;
    }

    return (
      <div className="graph_wrapper">
        <div className="graph">
          <Line
            data={this.createChartData(this.state.graphData)}
            options={this.createChartOptions()}
          />
        </div>
        <p className="graph_data">
          Graph Avg: {display_graph_avg}<br/>
          Batch Avg: {display_batch_avg}<br/>
          Rolling Avg: {display_rolling_avg}<br/>
          Actual sampling rate: {display_actual_sample_rate}<br/>
          Std: {display_std}<br/>
          mCV: {display_cv}
        </p>
      </div>
    );
  }
}
export default Graph;