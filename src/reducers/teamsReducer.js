import {ADD_TEAM, FETCH_PINS, FETCH_TEAMS} from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
    switch (action.type) {
        case FETCH_TEAMS:
            return action.payload;
        case FETCH_PINS:
            console.log("team reducer", state);
            const teamIndex = state.indexOf(action.payload.team);
            const playerIndex = state[teamIndex].players.indexOf(action.payload.player);
            state[teamIndex].players[playerIndex] = {
                ...state[teamIndex].players[playerIndex],
                latlng: action.payload.latlng
            };
            return state;
        case ADD_TEAM:
            return [...state, action.payload];
        default:
            return state;
    }
}