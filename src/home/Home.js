import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../graph/Graph'

class Home extends Component {
  render() {
    let yesterday = moment.utc().subtract(1, 'days').date()
    let previous_hour = moment.utc().subtract(1, 'hours').hour()
    let image_host = 'http://46.101.184.224:8080'

    return (
      <div>
        <h2>Last 20 seconds</h2>
        <Graph/>
        <h2>Last 10 minutes</h2>
        <img src={`${image_host}/images/latest.svgz`} />

        <h2>Last hour</h2>
        <img src={`${image_host}/images/hour_${previous_hour}.svgz`} />

        <h2>Yesterday</h2>
        <img src={`${image_host}/images/day_${yesterday}.svgz`} />
      </div>
    );
  }
}

export default Home;
