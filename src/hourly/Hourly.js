import React, { Component } from 'react';

class Hourly extends Component {
  render() {
    const { seismometer_id } = this.props.match.params;
    const image_host = 'https://' + process.env.REACT_APP_API_ENDPOINT + '/' + seismometer_id;
    return (
      <div>
        <h2>Hourly plots</h2>
        {
          [...Array(24).keys()].map(
            (object, i) => <img key={i} src={`${image_host}/images/hour_${i}.svgz`} />
          )
        }
      </div>
    );
  }
}

export default Hourly;
