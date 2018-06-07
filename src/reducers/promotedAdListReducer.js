import {FETCH_ADS, SUBMIT_UPVOTE, SUBMIT_DOWNVOTE} from "./types";
import {addTeam} from "../actions/teamsActions";

const initialState = []

export default function(state = initialState, action) {
    switch(action.type) {
        case SUBMIT_UPVOTE:
            return initialState.map(function);
            return action.payload;
        case SUBMIT_DOWNVOTE:
            return action.payload;
        case FETCH_ADS:
            return action.payload;
        default:
            return state;
    }
}
