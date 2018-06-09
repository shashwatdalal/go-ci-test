import React, { Component } from 'react';
import './Stylesheets/master.css';
import './Stylesheets/profile.css';
import AvailabiltyTable from './Profile/AvailabiltyTable';
import axios from 'axios';
import UserProfile from './Profile/UserProfile';

class Profile extends Component {
  state = {
    username: "",
    name: "",
    age: -1,
    location: "",
    score: -1,
    fixtures: [],
    upcoming: [],
    isEditting: false
  };

  loadUserInformation() {
    // Query DB
    var _this = this;
    var username = UserProfile.getName();
    axios.get('/getuserinfo?username='+username)
         .then(function(response) {
           _this.setState({
             name: response.data.Name,
             age: response.data.Age,
             location: response.data.Location,
             score: response.data.Score
           });
         });
  }

  loadUserFixtures() {
    var _this = this;
    var username = UserProfile.getName();
    axios.get('/getuserfixtures?username=' + username)
         .then(function(response) {
           _this.setState({
             fixtures: response.data
           });
         });
  }

  loadUpcoming() {
        var _this = this;
        var username = UserProfile.getName();
        axios.get('/getuserupcoming?username=' + username)
            .then(function (response) {
                _this.setState({
                    fixtures: response.data
                });
            });
    }

  componentDidMount() {
    this.loadUserInformation();
    this.loadUserFixtures();
    this.loadUpcoming();
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

  showEditBox(e) {
    e.preventDefault();

    var _this = this;
    _this.setState({
      isEditting: true
    })
  }

  render() {
    return (
      <div id='contentpanel'>
        <div id='contentcontainer'>
          <p class='thintext centertext'>Welcome back</p>
          <h1 id='username' class='centertext'>{UserProfile.getName()}</h1>
          <h3 class='centertext'>Location: <span class='thintext'>{this.state.location} <a onClick={e => this.showEditBox(e)}>(change)</a></span></h3>
          {this.state.isEditting ? <input type='text' /> : ""}
          <div class="AvTable">
            <AvailabiltyTable />
          </div>

          <div id='fixturesbox'>
            <table>
              <thead>
                <td>
                  Previous
                </td>
                <td>
                  Upcoming
                </td>
              </thead>
              <tr>
                <td>
                {
                  this.state.fixtures.length == 0 ? <b>(empty)</b> :
                  this.state.fixtures.map(item =>
                    <div class={"resultcard " + this.getResult(item)}>
                    <p class='centertext'>versus <a><span class='oppname'>{item.Opposition} ({item.IsHome ? "H" : "A"})</span></a><br />
                    playing for {item.ForTeam} in {item.Sport}</p>
                    <h2 class='centertext'>{item.ScoreHome} - {item.ScoreAway}</h2>
                    <p class='centertext'>{item.Date}, {item.Location}</p>
                    </div>
                  )
                }
                </td>
                <td>
                {
                  this.state.upcoming.length == 0 ? <b>(empty)</b> :
                  this.state.upcoming.map(item =>
                    <div class={"resultcard unplayed"}>
                    <p class='centertext'>versus <a><span class='oppname'>{item.Opposition} ({item.IsHome ? "H" : "A"})</span></a><br />
                    playing for {item.ForTeam} in {item.Sport}</p>
                    <p class='centertext'>{item.Date}, {item.Location}</p>
                    </div>
                  )
                }
                </td>
              </tr>
            </table>
            <div id='prevbox'>
            </div>

            <div id='upcbox'>
            </div>
          </div>

        </div>
      </div>
    );
  }
}


export default Profile;
