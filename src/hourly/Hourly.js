import React, { Component } from 'react';

class Hourly extends Component {
  render() {
    let image_host = 'https://' + process.env.REACT_APP_API_ENDPOINT + '/lehman';;
    return (
      <div>
        <h2>Hourly plots</h2>
        {
          [...Array(24).keys()].map(
            (object, i) => <img src={`${image_host}/images/hour_${i}.svgz`} />
          )
        }
      </div>
    );
  }
}

export default Hourly;
