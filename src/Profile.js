import React, { Component } from 'react';
import './Stylesheets/master.css';
import './Stylesheets/profile.css';
import AvailabiltyTable from './Profile/AvailabiltyTable';
import axios from 'axios';

class Profile extends Component {
  state = {
    username: "thomasyung_",
    name: "Thomas Yung",
    age: 20,
    location: "Manchester",
    score: 1000,
    input: "",
    matches: [
      {
        date: "03-12-17",
        opponent: "Shashwat Dalal",
        scoreFor: 3,
        scoreAgainst: 2,
      },
      {
        date: "12-04-17",
        opponent: "Andy Li",
        scoreFor: 2,
        scoreAgainst: 2,
      },
      {
        date: "29-12-97",
        opponent: "Marcel Kenlay",
        scoreFor: 1,
        scoreAgainst: 10,
      }
    ]
  };

  loadProfile() {
    // Query DB
    axios.get('http://localhost:9000/echo?test').then(response => console.log(response));
  }

  getResult(item) {
    if (item.scoreFor > item.scoreAgainst) {
      return "win";
    }
    if (item.scoreFor < item.scoreAgainst) {
      return "lose"
    }

    return "draw";
  }

  inputChange(e) {
    const value = e.target.value;
    this.setState({input: value});
  }

  // <input type='text' onChange={e => this.inputChange(e)}/>
  // <button onClick={this.loadProfile()}>Submit</button>


  render() {
    return (
      <div id='contentpanel'>
        <div id='contentcontainer'>
          <a><p class='centertext'>Load Details</p></a>
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
            this.state.matches.map(item =>
              <div class={"resultcard " + this.getResult(item)}>
              <p class='centertext'>versus <a><span class='oppname'>{item.opponent}</span></a></p>
              <h2 class='centertext'>{item.scoreFor} - {item.scoreAgainst}</h2>
              <p class='centertext'>{item.date}</p>

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
