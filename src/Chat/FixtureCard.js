import React, { Component } from 'react';
import './Stylesheets/FixtureCard.css';

var axios = require('axios');

class FixtureCard extends Component {
  state = {
    location: "Failed to Find",
    upvotes: 3,
    downvotes: 0,
    upvoted: false,
    downvoted: false
  }

  componentDidMount() {
    var venue_latlng = this.props.data.Location.split("(")[1].split(")")[0];
    var request_url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="
                      + venue_latlng

    var _this = this
    _this.serverRequest = axios.get(request_url)
          .then(function(result) {
            console.log(result);
            _this.setState({location: result.data.results[0].formatted_address});
          })
  }

  toggle_upvote() {
    // Write upvote to file, check if upvote already in file
    if (this.state.downvoted) {
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
  }


  toggle_downvote() {
    // Write downvote to file, check if upvote already in file
    if (this.state.upvoted) {
      this.setState({
        upvotes: this.state.upvotes - 1,
        downvotes: this.state.downvotes + 1,
        upvoted: false,
        downvoted: true
      })
    } else if (this.state.downvoted) {
      this.setState({
        downvotes: this.state.downvotes - 1,
        downvoted: false
      })
    } else {
      this.setState({
        downvotes: this.state.downvotes + 1,
        downvoted: true
      })
    }
  }

  fixture_time(start, end){
    var start = (start.split("Z"))[0].split("T");
    var start_date = start[0];
    var start_time = start[1];
    var end = (end.split("Z"))[0].split("T");
    var end_date = end[0];
    var end_time = end[1];
    if (start_date === end_date) {
      return start_date + ":  " + start_time + " - " + end_time;
    } else {
      return start + " to " + end
    }
  }

  render() {
    return <div class="card">
        <div class="team"> {this.props.data.Name} </div>
        <div class="venue">{this.state.location}</div>
        <div class="date"> {this.fixture_time(this.props.data.StartTime, this.props.data.EndTime)}</div>
        <div class="sport">{this.props.data.Sport}</div>
        <div class="upvote">
          <div class={this.state.upvoted ? 'arrow-up-selected': 'arrow-up'}
            onClick={() => this.toggle_upvote()}></div>
              {this.state.upvotes}
        </div>
        <div class="downvote">
          <div class={this.state.downvoted ? 'arrow-down-selected': 'arrow-down'}
            onClick={() => this.toggle_downvote()}></div>
              {this.state.downvotes}
        </div>
      </div>
  }
}


export default FixtureCard;
