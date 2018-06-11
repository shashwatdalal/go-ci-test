import React, {Component} from 'react';
import './Stylesheets/ProfileFixtureCard.css';

var axios = require('axios');

class UpcomingFixtureCard extends Component {
  state = {
    Location: "Failed to find."
  }

  componentDidMount() {
    var venue_latlng = response.data.LocLat + "," + response.data.LocLng;
    var request_url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="
                      + venue_latlng

    var _this = this
    _this.serverRequest = axios.get(request_url)
          .then(function(result) {
            console.log(result);
            _this.setState({Location: result.data.results[0].formatted_address});
          })
  }

  formatDate(date) {
    var start = (date.split("Z"))[0].split("T");
    return start[0] + " " + start[1]
  }

  render() {
    return (
      <div class={"resultcard unplayed"}>
      <p class='centertext'>versus <a><span class='oppname'>{this.props.data.Opposition} ({this.props.data.IsHome ? "H" : "A"})</span></a><br />
      playing for <b>{this.props.data.ForTeam}</b> in <b>{this.props.data.Sport}</b></p>
      <p class='centertext'>{this.formatDate(this.props.data.Date)}, {this.state.Location}</p>
      </div>
    )
  }
}


export default UpcomingFixtureCard;
