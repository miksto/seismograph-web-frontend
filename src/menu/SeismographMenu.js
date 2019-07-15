import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Menu.css';


class SeismographMenu extends Component {
  render() {
    return (
        <nav id="seismograph-navigation">
          <Link to="/lehman">LEHMAN</Link>
          <Link to="/vertical_pendulum">VERTICAL_PENDULUM</Link>
        </nav>
    );
  }
}

export default SeismographMenu;
