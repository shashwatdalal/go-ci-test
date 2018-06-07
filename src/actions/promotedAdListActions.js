import {FETCH_ADS, SUBMIT_UPVOTE, SUBMIT_DOWNVOTE} from "./types";
import { serverDomain } from "../ipconfig"

export const fetchTeams = () => dispatch => {

  export const fetchAds() = () => dispatch => {
    team_name = "test_team"
    fetch(serverDomain + "/getAds?team_name=" + team_name)
          .then(res => res.json())
          .then(ads => dispatch({
              type: FETCH_ADS,
              payload: ads
          }))
  }

  export const submitUpvote() = advertID => dispatch => {
    dispatch({
      type: SUBMIT_UPVOTE,
      payload: advertID
    })
  }

  export const submitDownvote() = advertID => dispatch => {
    dispatch({
      type: SUBMIT_DOWNVOTE,
      payload: advertID
    })
  }

}
