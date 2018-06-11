import {serverDomain} from "../ipconfig"
import {FETCH_TEAMS} from "./types";
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