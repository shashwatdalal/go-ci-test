import React, { Component } from 'react';
import './Stylesheets/Header.css';

class Header extends Component {
  render() {
    return (
      <div id='menupanel'>
          <h1>"PLACEHOLDER"</h1>
          <div id="menuwrapper">
          <ul>
            <li><a href="/profile">Profile</a></li>
            <li><a href="/matchmaking">Matchmaking</a></li>
            <li><a href="/leaderboards">Leaderboards</a></li>
            <li><a href="/teams">Teams</a></li>
            <li><a href="/chat">Chat</a></li>
          </ul>
          </div>
      </div>
    );
  }
}

export default Header;
