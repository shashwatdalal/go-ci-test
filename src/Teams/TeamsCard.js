import React, {Component} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import {connect} from "react-redux";
import {fetchTeams} from "../actions/teamsActions";
import "./Stylesheets/TeamCardsGrid.css";
import SimpleMap from "./SimpleMap";

class TeamsCard extends Component {

    componentWillMount() {
        this.props.fetchTeams();
    }

    render() {
        return (
            <Tabs defaultActiveKey={1}>
                {this.props.teams.map((t, index) =>
                    <Tab eventKey={index + 1} title={t.name}>
                        <div class="TeamCardsGrid">
                            <div class="teamname">
                                <h1>{t.name}</h1>
                            </div>
                            <div class="teamcard">
                                <h2>Players</h2>
                                <table>
                                    <tr>
                                        <td>
                                            {t.players.map(p =>
                                                <div>
                                                    <img src={p.image}/>
                                                    <p>{p.name}</p>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="map">
                               <h2>Map</h2>
                                <SimpleMap
                                    players={t.players}
                                 />
                            </div>
                            <br/><br/>
                        </div>
                    </Tab>
                )}
            </Tabs>
        );
    }
}

const mapStateToProps = state => ({
    teams: state.teams
});

export default connect(mapStateToProps, {fetchTeams})(TeamsCard)

