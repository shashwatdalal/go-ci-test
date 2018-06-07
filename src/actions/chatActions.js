import {FETCH_MESSAGES, SEND_MESSAGE} from "./types";
import { serverDomain } from "../ipconfig"

export const fetchMessages() = () => dispatch => {
  chat_name = "test_chat"
  fetch(serverDomain + "/getMessages?chatName=" + chat_name)
        .then(res => res.json())
        .then(messages => dispatch({
            type: FETCH_MESSAGES,
            payload: messages
        }))
}

export const sendMessage = message => dispatch => {
    dispatch({
        type: SEND_MESSAGE,
        payload: message
    });
};
