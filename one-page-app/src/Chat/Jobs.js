import React, { Component } from 'react';
var axios = require('axios');

class Jobs extends Component {
    state = {
        jobs: []
    }

    componentDidMount() {
      var _this = this;
      this.serverRequest =
        axios
          .get("jobs.json")
          .then(function(result) {
            _this.setState({
              jobs: result.data.jobs
            });
          })
    }

    componentWillUnmount() {
      this.serverRequest.abort();
    }

    render() {
      return (
        <div>
          <h1>Jobs</h1>
          <ul>
            {this.state.jobs.map(item =>  (<li>{item.company_name}</li>))}
          </ul>
        </div>
      )
    }
}

export default Jobs;
