import React, { Component } from 'react';
import moment from 'moment';

class Home extends Component {
  render() {
    let yesterday = moment.utc().subtract(1, 'days').day()
    let previous_hour = moment.utc().subtract(1, 'hours').hour()

    return (
      <div>
        <h2>Last 10 minutes</h2>
        <img src="http://46.101.184.224:8080/images/latest.png" />

        <h2>Last hour</h2>
        <img src={"http://46.101.184.224:8080/images/hour_" + previous_hour + ".png"} />

        <h2>Yesterdays day plot</h2>
        <img src={"http://46.101.184.224:8080/images/day_" + yesterday + ".png"} />
      </div>
    );
  }
}

export default Home;
