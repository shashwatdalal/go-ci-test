import { serverDomain } from "../ipconfig"
import { FETCH_TEAMS, ADD_TEAM } from "./types";

export const fetchTeams = () => dispatch => {
    fetch(serverDomain + "/getTeams")
        .then(res => res.json())
        .then(teams => dispatch({
            type: FETCH_TEAMS,
            payload: teams
        }));
}

export const addTeam = (team) => dispatch => {
    dispatch( {
        type: ADD_TEAM,
        payload: team
    })
}