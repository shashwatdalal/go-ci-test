import {ADD_TEAM, FETCH_TEAMS} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_TEAMS:
            return action.payload;
        case ADD_TEAM:
            return [...state,action.payload];
        default:
            return state;
    }
}