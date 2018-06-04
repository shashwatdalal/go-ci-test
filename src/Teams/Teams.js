import React, {Component} from 'react';
import "./Teams/Stylesheets/MainGrid.css"
import Invitations from "./Teams/Invitations"
import TeamCard from "./Teams/TeamsCard"
import {Button} from 'react-bootstrap'

class Teams extends Component {
    render() {
        return (
            <div>
                <div class="teaminfo">
                    <TeamCard/>
                </div>
                <div class="createTeam">
                    <Button bsStyle="success" bsSize="large">
                        Create Team
                    </Button>
                </div>
                <div class="invitation">
                    <Invitations/>
                </div>
            </div>);
    }
}

export default Teams;
