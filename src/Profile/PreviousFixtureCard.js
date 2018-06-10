import React, {Component} from 'react';
import './Stylesheets/ProfileFixtureCard.css';

var axios = require('axios');

class PreviousFixtureCard extends Component {
  state = {
    Location: "Failed to find."
  }

  componentDidMount() {
    var venue_latlng = this.props.data.Location.split("(")[1].split(")")[0];
    var request_url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="
                      + venue_latlng

    var _this = this
    _this.serverRequest = axios.get(request_url)
          .then(function(result) {
            console.log(result);
            _this.setState({Location: result.data.results[0].formatted_address});
          })
  }

  getResult(item) {
    if (item.scoreFor == "") {
      return "unplayed";
    }

    if (item.ScoreHome == item.ScoreAway) {
      return "draw";
    }

    if (item.IsHome) {
      if (item.ScoreHome > item.ScoreAway) {
        return "win";
      }
      if (item.ScoreHome < item.ScoreAway) {
        return "lose";
      }
    } else {
      if (item.ScoreHome < item.ScoreAway) {
        return "win";
      }
      if (item.ScoreHome > item.ScoreAway) {
        return "lose";
      }
    }
  }

  formatDate(date) {
    var start = (date.split("Z"))[0].split("T");

    return start[0] + " " + start[1]
  }

  render() {
    return (
      <div class={"resultcard " + this.getResult(this.props.data)}>
      <p class='centertext'>versus <a><span class='oppname'>{this.props.data.Opposition} ({this.props.data.IsHome ? "H" : "A"})</span></a><br />
      playing for <b>{this.props.data.ForTeam}</b> in <b>{this.props.data.Sport}</b></p>
      <h2 class='centertext'>{this.props.data.ScoreHome} - {this.props.data.ScoreAway}</h2>
      <p class='centertext'>{this.formatDate(this.props.data.Date)}, {this.state.Location}</p>
      </div>
    )
  }
}


export default PreviousFixtureCard;
