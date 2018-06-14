import React, {Component} from 'react';
import FixtureCard from './FixtureCard';
import './Stylesheets/FixtureList.css';

var axios = require('axios');

class FixtureList extends Component {
    state = {
        fixtures: []
    }

    componentDidMount() {
        var _this = this;
        var req = "getPromotedFixtures?team=" + this.props.team_id
        this.serverRequest = axios.get(req)
            .then(function (result) {
                _this.setState({fixtures: result.data});
            })
    }

    render() {
        return (
            <div class="FixtureList">
                <h1>Fixtures</h1>
                {
                    this.state.fixtures.map(fixture => (<FixtureCard key={`li-${fixture.AdID}`} data={fixture}/>))
                }
            </div>
        );
    }
}

export default FixtureList;
