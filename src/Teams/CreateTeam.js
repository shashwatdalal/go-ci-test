import React, {Component} from 'react';

var axios = require('axios');

class CreateTeam extends Component {
  state = {
    invitees: [],
    query: "",
    query_results: []
  }

  getQueryResults() {
    var _this = this;
    if (this.state.query.length === 0) {
      _this.setState({
        query_results: []
      })
      return
    }
    var req = "/getUsernameMatches?pattern=" + this.state.query
    this.serverRequest = axios.get(req)
        .then(function (result) {
            _this.setState({query_results: result.data});
        })
  }

  handleInputChange() {
   this.setState({
     query: this.search.value
   }, this.getQueryResults())
  }

  render() {
    return (
        <div class="CreateTeam">
          <input
            placeholder="Search for..."
            ref={input => this.search = input}
            onChange={this.handleInputChange}
          />
          <ul>
            {this.state.query_results
              .map(res => (<li>res.Username - res.FullName</li>))}
          </ul>
        </div>
    );
  }
}

export default CreateTeam
