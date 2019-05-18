import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../graph/Graph'

class Home extends Component {
  render() {
    let yesterday = moment.utc().subtract(1, 'days').date();
    let image_host = 'http://' + process.env.REACT_APP_API_ENDPOINT;

    return (
      <div>
        <h2>Last 20 seconds</h2>
        <Graph/>
        <h2>Last 10 minutes</h2>
        <img src={`${image_host}/images/last_10_minutes.svgz`} />

        <h2>Last 60 minutes</h2>
        <img src={`${image_host}/images/last_60_minutes.svgz`} />

        <h2>Yesterday</h2>
        <img src={`${image_host}/images/day_${yesterday}.svgz`} />
      </div>
    );
  }
}

export default Home;
