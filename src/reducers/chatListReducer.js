import {ADD_TEAM, FETCH_TEAMS} from "../actions/types";

const initialState = {
  active_chat: 0,
  chats: []
};

export default function(state = initialState, action) {
    switch(action.type) {
        case FETCH_CHATS:
            return {
              active_chat: this.state.active_chat,
              chats: action.payload
            };
        case SET_ACTIVE_CHAT:
            return {
              active_chat: action.payload,
              chats: this.state.chats
            };
        default:
            return initialState;
    }
}
