import { combineReducers } from "redux";
import teamsReducer from "./teamsReducer";
import invitationsReducer from "./invitationsReducer";
import chatListReducer from "./chatListReducer";
import promotedAdListReducer from "./promotedAdListReducer";

export default combineReducers( {
    teams: teamsReducer,
    invitations: invitationsReducer,
    chat: chatReducer,
    chatList: chatListReducer,
    promotedAdList: promotedAdListReducer
})
