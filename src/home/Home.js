import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../graph/Graph'

class Home extends Component {
  render() {
    const { seismometer_id } = this.props.match.params;
    const yesterday = moment.utc().subtract(1, 'days').date();
    const image_host = 'https://' + process.env.REACT_APP_API_ENDPOINT + '/' + seismometer_id;

    return (
      <div>
        <h2>Last 30 seconds</h2>
        <Graph seismometer_id={seismometer_id} />
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
