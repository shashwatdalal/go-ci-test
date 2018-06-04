import React, {Component} from 'react';
import "./Stylesheets/MainGrid.css"
import Invitations from "./Invitations"
import TeamCard from "./TeamsCard"
import { Button } from 'react-bootstrap'

class Teams extends Component {
    render() {
        return (
            <div class="TeamGrid">
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
