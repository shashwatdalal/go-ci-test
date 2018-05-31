import React, { Component } from 'react';
import FixtureCard from './FixtureCard';
import './Stylesheets/FixtureList.css';

var axios = require('axios');

class FixtureList extends Component {
  state = {
      fixtures: []
  }

  componentDidMount() {
    var _this = this;
    this.serverRequest =
      axios
        .get("promoted_fixtures.json")
        .then(function(result) {
          _this.setState({
            fixtures: result.data.fixtures
          });
        })
  }

  render() {
    return (
      <div class="FixtureList">
        <h1>Fixtures</h1>
        {
          this.state.fixtures.map(fixture => (<FixtureCard key={`li-${fixture.id}`} data={fixture}/>))
        }
      </div>
    );
  }
}

export default FixtureList;
