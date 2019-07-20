import React, { Component } from 'react';
import moment from 'moment';
import { Route } from "react-router-dom";
import Menu from '../menu/DataViewMenu'
import Home from '../home/Home'
import Hourly from '../hourly/Hourly'


class SeismographView extends Component {
  render() {
    const current_utc_time = moment.utc().format("HH:mm");
    return (
      <div>
        <Menu {...this.props}/>
        <h2>Utc time: {current_utc_time}</h2>
        <Route exact={true} path="/:seismometer_id" component={Home} />
        <Route exact={true} path="/:seismometer_id/hourly" component={Hourly}  />
      </div>
    );
  }
}

export default SeismographView;
