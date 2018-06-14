import React, {Component} from 'react';
import axios from 'axios';
import UserProfile from '../Profile/UserProfile';
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";

import "./Stylesheets/FixtureRightPanel.css"
import "../Stylesheets/master.css"

class FixtureRightPanel extends Component {

  constructor(props){
    super(props)
    this.state = {
      active_key: "1",
      playedBefore: true,
      currentTeamID: -1,
      upcoming: {
        homeTeam: "",
        awayTeam: "",
        sport: "",
        lat: 0.0,
        lng: 0.0,
        location: "",
        date: "",
        time: ""
      },
      submittedScore: {
        scoreHome: -1,
        scoreAway: -1,
        submitterID: -1
      }
    };

  }

  queryUpcomingGame() {
    // Query DB for upcoming game
    var _this = this;
    axios.get('/getupcominggame?fixtureID=' + this.props.fixture_id)
         .then(function(response) {
           if (response.data == "fail\n") {
             return;
           }

           var datesplit = response.data.Date.split(" ");

           var venue_latlng = response.data.LocLat + "," + response.data.LocLng;
           var request_url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="
                             + venue_latlng

           var newupcoming = {
             homeTeam: response.data.HomeTeam,
             awayTeam: response.data.AwayTeam,
             sport:    response.data.Sport,
             date:     datesplit[0],
             time:     datesplit[1],
             location: "Holder"
           }

           _this.setState({upcoming: newupcoming});

           // TODO: Uncomment this for the master version

           // axios.get(request_url)
           //       .then(function(result) {
           //
           //         var newupcoming = {
           //           homeTeam: response.data.HomeTeam,
           //           awayTeam: response.data.AwayTeam,
           //           sport:    response.data.Sport,
           //           date:     datesplit[0],
           //           time:     datesplit[1],
           //           location: result.data.results[0].formatted_address
           //         }
           //
           //         _this.setState({upcoming: newupcoming});
           //       })
         });
  }

  querySubmittedScore() {
    // Query DB for a submittedScore game
    var _this = this;
    axios.get('/getsubmittedscore?fixtureID=' + this.props.fixture_id)
         .then(function(response) {
           var newsubscore = {
             scoreHome: response.data.ScoreHome,
             scoreAway: response.data.ScoreAway,
             submitterID: response.data.SubmitterID
           }

           console.log(newsubscore)

           _this.setState({
             submittedScore: newsubscore
           })
         });
  }

  componentDidMount() {
    this.queryUpcomingGame();
    this.querySubmittedScore();
  }

  handleSelect(key) {
    this.setState({
      active_key: key
    })
  }

  getUpcomingFixtureText() {
    if (this.state.upcoming.homeTeam == "") {
      return ""
    }

    return (
      <div>
        <p>
          The upcoming game between <span class="thintext bigtext">{this.state.upcoming.homeTeam}</span> and <span class="thintext bigtext">{this.state.upcoming.awayTeam}</span> is at <span class="thintext bigtext">{this.state.upcoming.location}</span> on <span class="thintext bigtext">{this.state.upcoming.date}</span> at <span class="thintext bigtext">{this.state.upcoming.time}</span>.
        </p>

        <hr />

        {this.getPendingResultText()}

      </div>
    )
  }

  getPreviousFixtureText() {
    if (!this.state.playedBefore) {
      return ""
    } else {
      return (
        <div>
          <hr />

          <p>The last time you met, <span class="thintext bigtext">Game Winner</span> won by a score of <span class="thintext bigtext">Winning Score</span> to <span class="thintext bigtext">Losing score</span></p>
        </div>
      )
    }
  }

  acceptScore() {
    var _this = this;
    axios.get('/acceptsubmittedscore?fixture_id=' + this.props.fixture_id);
  }

  rejectScore() {
    var _this = this;
    axios.get('/rejectsubmittedscore?fixtures_id=' + this.props.fixture_id);

    var defaultSubScore = {
      scoreHome: -1,
      scoreAway: -1,
      submitterID: -1
    }

    _this.setState({
      submittedScore: defaultSubScore
    })
  }

  getPendingResultText() {
    if (this.state.submittedScore.submitterID == -1) {
      return (
        <div>
          <p>Already played? Enter the score below!</p>

          <table id="recordScoreTable">
            <tr>
              <td>
                Home ({this.state.upcoming.homeTeam})
              </td>
              <td>
                versus
              </td>
              <td>
                Away ({this.state.upcoming.awayTeam})
              </td>
            </tr>
            <tr>
              <td>
                <input type='text' id="scoreHomeInput" class="scoreInput" />
              </td>
              <td>
                <h1> - </h1>
              </td>
              <td>
                <input type='text' id="scoreAwayInput" class="scoreInput" />
              </td>
            </tr>
          </table>

          <h3 class="centertext">Submit</h3>
          <p>NOTE: the other team must confirm the score before it is saved</p>
        </div>
      )
    } else {

      if (this.state.submittedScore.submitterID == this.state.currentTeamID) {
        return (
          <h3>Waiting for the other team to confirm the score.</h3>
        )
      } else {
        return (
          <div>
            <h3>The other team submitted a score of [H) - (A)] {this.state.submittedScore.homeScore} - {this.state.submittedScore.awayScore}</h3>
            <h4>Is this right?</h4>
            <table>
              <tr>
                <td onClick={this.acceptScore()}>
                  Yes
                </td>
                <td onClick={this.rejectScore()}>
                  No
                </td>
              </tr>
            </table>
          </div>
        )
      }

    }
  }

  render() {
    var _this = this
    return (
      <div id="rightPanelWrapper">

        {this.getUpcomingFixtureText()}

        <hr />

        {this.getPreviousFixtureText()}

      </div>
    )
  }
}

export default FixtureRightPanel;
