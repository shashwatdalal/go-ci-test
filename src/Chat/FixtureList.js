import React, {Component} from 'react';
import FixtureCard from './FixtureCard';
import './Stylesheets/FixtureList.css';

var axios = require('axios');

class FixtureList extends Component {
  state = {
      fixtures: []
  }

  componentDidMount() {
    this.getPromotedFixtures()
  }

  getPromotedFixtures() {
      var _this = this;
      var req = "getPromotedFixtures?team=" + this.props.team_id
      this.serverRequest = axios.get(req)
          .then(function (result) {
              _this.setState({fixtures: result.data});
          })
  }


  componentDidUpdate(prevProps) {
    if (prevProps.team_id !== this.props.team_id) {
     this.getPromotedFixtures()
    }
  }

  render() {
      return (
          <div class="FixtureList">
              <h1>Fixtures</h1>
              {
                  this.state.fixtures.map(fixture => (<FixtureCard key={`li-${fixture.AdID}`} data={fixture} team_id={this.props.team_id}/>))
              }
          </div>
      );
  }
}

export default FixtureList;
