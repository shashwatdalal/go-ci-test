import {FETCH_ADS, SUBMIT_UPVOTE, SUBMIT_DOWNVOTE} from "./types";
import { serverDomain } from "../ipconfig"

export const fetchTeams = () => dispatch => {

  export const fetchAds() = () => dispatch => {
    team_name = chatList.chat_id
    fetch(serverDomain + "/getAds?team_name=" + team_name)
          .then(res => res.json())
          .then(ads => dispatch({
              type: FETCH_ADS,
              payload: ads
          }))
  }
  export const toggleUpvote = (advertID) => dispatch => {
    advert = props.promotedAdList.
    if (props..downvoted) {
      this.setState({
        downvotes: this.state.downvotes - 1,
        upvotes: this.state.upvotes + 1,
        upvoted: true,
        downvoted: false
      })
    } else if (this.state.upvoted) {
      this.setState({
        upvotes: this.state.upvotes - 1,
        upvoted: false
      })
    } else {
      this.setState({
        upvotes: this.state.upvotes + 1,
        upvoted: true
      })
    }
    dispatch({
      type: TOGGLE_UPVOTE,
      payload: advertID
    })
  }

  export const submitDownvote = (advertID) => dispatch => {
    dispatch({
      type: SUBMIT_DOWNVOTE,
      payload: advertID
    })
  }

}
