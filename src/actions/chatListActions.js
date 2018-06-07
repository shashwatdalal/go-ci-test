import {FETCH_CHATS} from "./types";
import { serverDomain } from "../ipconfig"

export const fetchTeams = () => dispatch => {

  export const fetchChats() = () => dispatch => {
    username = "test_user"
    fetch(serverDomain + "/getChats?username=" + username)
          .then(res => res.json())
          .then(chats => dispatch({
              type: FETCH_CHATS,
              payload: chats
          }))
  }

}
