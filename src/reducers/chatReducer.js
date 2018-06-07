import {ADD_TEAM, FETCH_TEAMS} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_MESSAGES:
            return action.payload;
        case SEND_MESSAGE:
            return [...state, message.payload];
        default:
            return state;
    }
}
