import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button } from 'react-bootstrap'
import {declineInvitation, acceptInvitation,fetchInvitations} from "../actions/invitationsActions";
import { connect} from "react-redux";

class Invitations extends Component {

    componentWillMount() {
        this.props.fetchInvitations();
    }

    render() {
        return (
            <div>
                <ListGroup>
                    { this.props.invitations.map((invitation) =>
                    <ListGroupItem header={invitation.name}>
                        <Button bsStyle="success" onClick={this.props.acceptInvitation.bind(this,invitation)}> Accept </Button>
                        <Button bsStyle="danger" onClick={this.props.declineInvitation.bind(this,invitation)}> Decline </Button>
                    </ListGroupItem>
                    )}
                </ListGroup>
            </div>
           );
    }
}

const mapStateToProps = state => ({
    invitations: state.invitations
});

export default connect(mapStateToProps, {acceptInvitation,declineInvitation,fetchInvitations})(Invitations)
