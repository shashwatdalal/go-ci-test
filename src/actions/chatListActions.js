import {FETCH_CHATS, SET_ACTIVE_CHAT} from "./types";
import { serverDomain } from "../ipconfig"

export const fetchChats = (username) => dispatch => {
  fetch(serverDomain + "/getChats?username=" + username)
        .then(res => res.json())
        .then(chats => dispatch({
            type: FETCH_CHATS,
            payload: chats
        }))
}

export const setActiveChat = (chat_id) => dispatch => {
  dispatch({
      type: SET_ACTIVE_CHAT,
      payload: chat_id
  });
}
