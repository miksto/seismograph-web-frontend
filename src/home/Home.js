import React, { Component } from 'react';
import moment from 'moment';
import Graph from '../graph/Graph'

class Home extends Component {
  render() {
    let yesterday = moment.utc().subtract(1, 'days').date()
    let previous_hour = moment.utc().subtract(1, 'hours').hour()

    return (
      <div>
        <h2>Last 20 seconds</h2>
        <Graph/>
        <h2>Last 10 minutes</h2>
        <img src="http://46.101.184.224:8080/images/latest.svg" />

        <h2>Last hour</h2>
        <img src={"http://46.101.184.224:8080/images/hour_" + previous_hour + ".svg"} />

        <h2>Yesterday</h2>
        <img src={"http://46.101.184.224:8080/images/day_" + yesterday + ".svg"} />
      </div>
    );
  }
}

export default Home;
