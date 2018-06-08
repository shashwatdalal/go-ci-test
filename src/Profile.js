import React, { Component } from 'react';
import './Stylesheets/master.css';
import './Stylesheets/profile.css';
import AvailabiltyTable from './Profile/AvailabiltyTable';
import axios from 'axios';
import UserProfile from './UserProfile';

class Profile extends Component {
  state = {
    username: "",
    name: "",
    age: -1,
    location: "",
    score: -1,
    fixtures: [],
    upcoming: []
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
    axios.get('/getuserfixtures?username='+username)
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
    // this.loadUpcoming();
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

  getForTeam(item) {
    if (item.ForTeam != "") {
      return "for " + item.ForTeam;
    }
  }

  render() {
    return (
      <div id='contentpanel'>
        <div id='contentcontainer'>
          <h1 id='username' class='centertext'>{this.state.username.toUpperCase()}</h1>
          <h3 class='centertext'>Name: <span class='thintext'>{this.state.name}</span></h3>
          <h3 class='centertext'>Age: <span class='thintext'>{this.state.age}</span></h3>
          <h3 class='centertext'>Location: <span class='thintext'>{this.state.location}</span></h3>
          <h3 class='centertext'>Score: <span class='thintext'>{this.state.score}</span></h3>
          <div class="AvTable">
            <AvailabiltyTable />
          </div>

          <div id='resultsbox'>

                  {
                      this.state.fixtures.map(item =>
                          <div class={"resultcard " + this.getResult(item)}>
                              <p class='centertext'>versus <a><span class='oppname'>{item.Opposition} ({item.IsHome ? "H" : "A"})</span></a><br />
                                  {this.getForTeam(item)} in {item.Sport}</p>
                              <h2 class='centertext'>{item.ScoreHome} - {item.ScoreAway}</h2>
                              <p class='centertext'>{item.Date}, {item.Location}</p>

                          </div>
                      )
                  }


          </div>



        </div>
      </div>
    );
  }
}


export default Profile;
