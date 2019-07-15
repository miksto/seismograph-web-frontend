import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Menu.css';


class DataViewMenu extends Component {
  render() {
    return (
        <nav id="data-view-navigation">
          <Link to={`${this.props.match.url}`}>Home</Link>
          <Link to={`${this.props.match.url}/hourly`}>Hourly</Link>
        </nav>
    );
  }
}

export default DataViewMenu;
