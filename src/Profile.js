import React, { Component } from 'react';
import './Stylesheets/master.css';
import './Stylesheets/profile.css';
import AvailabiltyTable from './Profile/AvailabiltyTable';
import axios from 'axios';
import UserProfile from './Profile/UserProfile';
import PreviousFixtureCard from './Profile/PreviousFixtureCard';
import UpcomingFixtureCard from './Profile/UpcomingFixtureCard';

class Profile extends Component {
  state = {
    username: "",
    location: "",
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
           var venue_latlng = response.data.Location.split("(")[1].split(")")[0];
           var request_url = "http://maps.googleapis.com/maps/api/geocode/json?latlng="
                             + venue_latlng

           var _this = this
           _this.serverRequest = axios.get(request_url)
                 .then(function(result) {
                   console.log(result);
                   _this.setState({location: result.data.results[0].formatted_address});
                 })
         });
  }

  loadUserFixtures() {
    var _this = this;
    var username = UserProfile.getName();
    // axios.get('/prevfix.json')
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
    // axios.get('/upfix.json')
    axios.get('/getuserupcoming?username=' + username)
        .then(function (response) {
            _this.setState({
                upcoming: response.data
            });
        });
  }

  componentDidMount() {
    this.loadUserInformation();
    this.loadUserFixtures();
    this.loadUpcoming();
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
                  this.state.fixtures.map(item => (<PreviousFixtureCard data={item} />))
                }
                </td>
                <td>
                {
                  this.state.upcoming.length == 0 ? <b>(empty)</b> :
                  this.state.upcoming.map(item => (<UpcomingFixtureCard data={item} />))
                }
                </td>
              </tr>
            </table>
          </div>

        </div>
      </div>
    );
  }
}


export default Profile;
