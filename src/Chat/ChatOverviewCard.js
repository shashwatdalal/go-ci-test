import React, {Component} from 'react';
import './Stylesheets/ChatOverviewCard.css';

class ChatOverviewCard extends Component {

  isUpper(character) {
    return character === character.toUpperCase() && character !== " "
  }

  abbreviateName(name) {
    var uppers = name.split('').filter(this.isUpper)
    if (uppers.length === 2 || uppers.length === 3) {
      return uppers;
    } else {
      return name.substring(0,2).toUpperCase()
    }
  }

  chatAbbreviation(chat){
    var _this = this;
    if (chat.FixtureID === -1) {
      return (<div class="chat_abbreviation"><div class="chat_abbreviation_bold">
          <strong>{_this.abbreviateName(chat.UserTeamName)}</strong></div>
      </div>)
    } else {
      return (<div class="chat_abbreviation">vs<div class="chat_abbreviation_bold">
          <strong>{_this.abbreviateName(chat.OppName)}</strong></div>
      </div>)
    }
  }

  chatName(chat) {
    if (chat.FixtureID === -1) {
      return chat.UserTeamName
    } else {
      return chat.UserTeamName + " vs " + chat.OppName
    }
  }

  render() {
    return <div class="ChatCard">
          {this.chatAbbreviation(this.props.data)}
          <div class="chat_name"> {this.chatName(this.props.data)} </div>
          <div class="recent_message"><strong>Needs to be implemented</strong></div>
      </div>
  }
}

export default ChatOverviewCard;
