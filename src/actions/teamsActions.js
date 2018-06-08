import {serverDomain} from "../ipconfig"
import {FETCH_TEAMS, ADD_TEAM} from "./types";
import {fetchPins} from "./pinsActions";

export const fetchTeams = () => dispatch => {
    //get team
    fetch(serverDomain + "/getTeams")
        .then(res => res.json())
        .then(teams => {
            dispatch({
                type: FETCH_TEAMS,
                payload: teams
            });
            return teams;
        })
        .then(teams => {
            teams.map(team => team.players.map(p => dispatch(fetchPins(p, team))));
        });
};

export const addTeam = (team) => dispatch => {
    dispatch({
        type: ADD_TEAM,
        payload: team
    });
};