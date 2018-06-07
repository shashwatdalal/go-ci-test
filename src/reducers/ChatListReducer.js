import {ADD_TEAM, FETCH_TEAMS} from "../actions/types";

const initialState = [];

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_CHATS:
            return action.payload;
        case SELECT_CHAT:
            
    }
}
