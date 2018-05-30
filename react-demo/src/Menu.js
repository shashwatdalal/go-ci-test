import React, { Component } from 'react';
import './menu.css';

class Menu extends Component {
  render() {
    return (
      <body>
        <div id='menupanel'>
          <table id='menutable'>
            <tr>
              <td>
                <a href="profile.html">Profile</a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="matchmaking.html">Matchmaking</a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="leaderboards.html">Leaderboards</a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="team.html">Teams</a>
              </td>
            </tr>
            <tr>
              <td>
                <a href="chat.html">Chat</a>
                <ul>
                  <li><a href="chat.html">(Team) School Friends</a></li>
                  <li><a href="chat.html">(Team) Uni Friends</a></li>
                  <li><a href="chat.html">(Fixture) vs Tom & 4 more</a></li>
                  <li><a href="chat.html">(Fixture) vs Andy</a></li>
                </ul>
              </td>
            </tr>
          </table>
        </div>
      </body>
    );
  }
}

export default Menu;
