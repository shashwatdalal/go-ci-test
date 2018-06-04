import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'

class Invitations extends Component {

    constructor(props) {
        super()
        this.state = {"teams": ["Sexy Pandas","Marcel FC","Andy Ris","Obi1"]}
    }

    declineInvitation(teamToDecline) {
      this.setState({
          "teams": this.state.teams.filter(team => team != teamToDecline)
      })
    }

    acceptInvitation(teamToAccept) {
        this.setState({
            "teams": this.state.teams.filter(team => team != teamToAccept)
        })
    }

    render() {
        return (
            <div>
                <ListGroup>
                    { this.state.teams.map((team) =>
                    <ListGroupItem header={team}>
                        <Button bsStyle="success" onClick={this.acceptInvitation.bind(this,team)}> Accept </Button>
                        <Button bsStyle="danger" onClick={this.declineInvitation.bind(this,team)}> Decline </Button>
                    </ListGroupItem>
                    )}
                </ListGroup>
            </div>);
    }
}

export default Invitations;
