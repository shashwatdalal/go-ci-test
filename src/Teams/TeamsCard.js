import React, {Component} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import {connect} from "react-redux";
import {fetchTeams} from "../actions/teamsActions";
import "./Stylesheets/TeamCardsGrid.css";
import SimpleMap from "./MiniMap";

class TeamsCard extends Component {

    componentWillMount() {
        this.props.fetchTeams();
    }

    render() {
        return (
            <Tabs defaultActiveKey={1}>
                {this.props.teams.map((t, index) => {
                    return (
                    <Tab eventKey={index + 1} title={t.name}>
                        <div class="TeamCardsGrid">
                            <div class="teamname">
                                <h1>{t.name}</h1>
                            </div>
                            <div class="map">
                               <h2>Map</h2>
                                <SimpleMap
                                team = {t}/>
                            </div>
                            <br/><br/>
                        </div>
                    </Tab>)}
                )}
            </Tabs>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    ...ownProps,
    teams: state.teams
});

export default connect(mapStateToProps, {fetchTeams})(TeamsCard)

