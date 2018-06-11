import {serverDomain} from "../ipconfig"
import {FETCH_TEAMS, ADD_TEAM} from "./types";
import UserProfile from "../Profile/UserProfile";

export const fetchTeams = () => dispatch => {
    //get team
    fetch(serverDomain + "/getTeams/" + UserProfile.getName())
        .then(res => res.json())
        .then(teams => {
            dispatch({
                type: FETCH_TEAMS,
                payload: teams
            });
            return teams;
        });
};

export const addTeam = (team) => dispatch => {
    dispatch({
        type: ADD_TEAM,
        payload: team
    });
};