import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../graph/Graph'

const GRAPH_LENGTH = {
  'lehman': 30,
  'vertical_pendulum': 20
}

class Home extends Component {
  render() {
    const { seismometer_id } = this.props.match.params;
    const yesterday = moment.utc().subtract(1, 'days').date();
    const image_host = process.env.REACT_APP_HTTP_SCHEME + process.env.REACT_APP_API_ENDPOINT + '/' + seismometer_id;
    const web_socket_base_url =  process.env.REACT_APP_WS_SCHEME + process.env.REACT_APP_API_ENDPOINT + '/ws/web-client'

    return (
      <div>
        <h2>Last {GRAPH_LENGTH[seismometer_id]} seconds</h2>
        <Graph seismometer_id={seismometer_id} graph_length={GRAPH_LENGTH[seismometer_id]} web_socket_base_url={web_socket_base_url} />
        <h2>Last 10 minutes</h2>
        <img src={`${image_host}/images/last_10_minutes.png`} />

        <h2>Last 60 minutes</h2>
        <img src={`${image_host}/images/last_60_minutes.png`} />

        <h2>Yesterday</h2>
        <img src={`${image_host}/images/day_${yesterday}.png`} />
      </div>
    );
  }
}

export default Home;
