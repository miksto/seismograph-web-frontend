import React, { Component } from 'react';

class Hourly extends Component {
  render() {
    return (
      <div>
        <h2>Hourly plots</h2>
        {
          [...Array(24).keys()].map(
            (object, i) => <img src={"http://46.101.184.224:8080/images/hour_" + i + ".png"} />
          )
        }
      </div>
    );
  }
}

export default Hourly;
