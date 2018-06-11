import React, {Component} from 'react';
import './Stylesheets/ChatOverviewCard.css';

class ChatOverviewCard extends Component {

  isUpper(character) {
    return character === character.toUpperCase() && character != " "
  }

  abbreviateChatName(chat_name) {
    var uppers = chat_name.split('').filter(this.isUpper)
    if (uppers.length == 2 || uppers.length == 3) {
      return uppers;
    } else {
      return chat_name.substring(0,2).toUpperCase()
    }
  }

  render() {
    return <div class="ChatCard">
          <div class="chat_abbreviation">
              <strong>{this.abbreviateChatName(this.props.data.name)}</strong>
          </div>
          <div class="chat_name"> {this.props.data.name} </div>
          <div class="recent_message"><strong>{this.props.data.recent_message_sender}: </strong>{this.props.data.recent_message}
          </div>
      </div>
  }
}

export default ChatOverviewCard;
