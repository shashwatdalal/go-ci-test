import React, {Component} from 'react';
import './Stylesheets/Header.css';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div id='menupanel'>
                <h1>MatchUps</h1>
                <div id="menuwrapper">
                    <table>
                      <tr>
                        <td><Link to="/profile">Profile</Link></td>
                        <td><Link to="/matchmaking">Matchmaking</Link></td>
                        <td><Link to="/teams">Teams</Link></td>
                        <td><Link to="/chat">Chat</Link></td>
                      </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default Header;
