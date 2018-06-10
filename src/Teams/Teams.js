import React, {Component} from 'react';
import "./Stylesheets/MainGrid.css"
import Invitations from "./Invitations"
import TeamsCard from "./TeamsCard"
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom';

export default class Teams extends Component {
    render() {
        return (
            <div class="TeamGrid">
                <div class="teaminfo">
                    <TeamsCard/>
                </div>
                <div class="createTeam">
                    <Link to="/createTeam">
                      Create a Team
                    </Link>
                </div>
                <div class="invitation">
                    <Invitations/>
                </div>
            </div>);
    }
}
