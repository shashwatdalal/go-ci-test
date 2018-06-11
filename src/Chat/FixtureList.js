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
        var req = "getTeamMatches?team=" + this.props.active_chat
        this.serverRequest = axios.get("/getTeamMatches")
            .then(function (result) {
                _this.setState({fixtures: result.data});
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
