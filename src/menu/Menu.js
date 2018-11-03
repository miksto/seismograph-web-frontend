import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Menu.css';


class Menu extends Component {
  render() {

    return (
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/hourly'>Hourly</Link>
        </nav>
    );
  }
}

export default Menu;
