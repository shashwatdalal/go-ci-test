import {FETCH_ADS, SUBMIT_UPVOTE, SUBMIT_DOWNVOTE} from "./types";
import {addTeam} from "../actions/teamsActions";

const initialState = [];

export default function(state = initialState, action) {
    switch(action.type) {
        case SUBMIT_UPVOTE:
            return state.filter(teams => teams.name !== action.payload.name);
        case SUBMIT_DOWNVOTE:
            return state.filter(team => team.name !== action.payload.name);
        case FETCH_ADS:
            return action.payload;
        default:
            return state;
    }
}
