import React, {Component} from 'react';
import './Stylesheets/MessageCard.css';
import UserProfile from '../Profile/UserProfile';
import ActiveUserID from '../Profile/ActiveUserID';

class FixtureCard extends React.Component {

  get_message_type() {
    if (this.props.sender_id == ActiveUserID.getID()) {
      return "sent"
    } else if (!this.props.is_fixture) {
      return "received_team"
    } else if (this.props.team_members.includes(this.props.sender_id)) {
      return "received_fixture_team"
    } else {
      return "received_fixture_opp"
    }
  }


  render() {
    return <div class={this.get_message_type()}>
      <div class="sender"> {this.props.sender_name} </div>
      <div class="message">
        <div class="message_text">{this.props.message}</div>
      </div>
    </div>
  }
}

export default FixtureCard;
