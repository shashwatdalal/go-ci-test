import React, { Component } from 'react';
import './Stylesheets/Header.css';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div id='menupanel'>
          <h1>"PLACEHOLDER"</h1>
          <div id="menuwrapper">
          <ul>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/matchmaking">Matchmaking</Link></li>
            <li><Link to="/leaderboards">Leaderboards</Link></li>
            <li><Link to="/teams">Teams</Link></li>
            <li><Link to="/chat">Chat</Link></li>
          </ul>
          </div>
      </div>
    );
  }
}

export default Header;