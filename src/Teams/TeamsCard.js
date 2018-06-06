import React, {Component} from 'react';
import {Tab, Tabs} from "react-bootstrap";
import {connect} from "react-redux";
import {fetchTeams} from "../actions/teamsActions";

class TeamsCard extends Component {

    componentWillMount() {
        this.props.fetchTeams();
    }

    render() {
        return (
             <Tabs defaultActiveKey={1}>
             {this.props.teams.map((t, index) =>
                 <Tab eventKey={index + 1} title={t.name}>
                     <h1>{t.name}</h1>
                     <h2>Players</h2>
                     <table>
                         <tr>
                             <td>
                                 {t.players.map(p =>
                                     <div>
                                         <img src={p.image}/>
                                         {p.name}
                                     </div>)}
                             </td>
                         </tr>
                     </table>
                     <br/><br/>
                 </Tab>
             )}
             </Tabs>
        );
    }
}

const mapStateToProps = state => ({
    teams: state.teams
})

export default connect(mapStateToProps, {fetchTeams})(TeamsCard)

