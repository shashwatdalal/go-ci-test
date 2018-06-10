import React, {Component} from 'react';

class CreateTeam extends Component {
  state = {
    invitees: []
    query: ""
    query_results: []
  }

  getQueryResults = () => {
    if (this.state.query.length === 0) {
      this.setState({
        query_results: []
      })
    }
    axios.get("/getUsersWithName=")
      .then(({ data }) => {
        this.setState({
          results: data.data // MusicGraph returns an object named data,
                             // as does axios. So... data.data
        })
      })
  }

    render() {
        return (
            <div class="CreateTeam">
            </div>
        );
    }
}

export default CreateTeam
