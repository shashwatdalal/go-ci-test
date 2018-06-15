import React, {Component} from 'react';
import MessageCard from './MessageCard';
import ActiveUserID from '../Profile/ActiveUserID';
import UserProfile from '../Profile/UserProfile';
import './Stylesheets/OpenChat.css';

var axios = require('axios');

class OpenChat extends Component {
  state = {
    team_members: [],
    messages: [],
    message: ""
  }

  inputChange(e) {
      const value = e.target.value;
      this.setState({
          message: value
      })
  }

  scrollChat() {
    var messageBox = document.getElementById("MessageBox");
    messageBox.scrollTop = messageBox.scrollHeight;
  }

  sendMessage() {
    var d = new Date();
    var time = d.getTime();
    var new_message = {
      SenderID:ActiveUserID.getID(),
      SenderName:UserProfile.getName(),
      Message:this.state.message,
      Time: time
    }
    this.setState({
      messages: [
        ...this.state.messages,
        new_message
      ],
      message:""
    }, () => {
      this.scrollChat();
    });
    var chat_name = (this.props.is_fixture) ?
                        ("_fixture" + this.props.active_chat.FixtureID)
                        : ("_team" + this.props.active_chat.UserTeamID)
    var message_info = {
      Chat: chat_name,
      SenderID: ActiveUserID.getID(),
      Message: this.state.message,
      Time: time
    }
    axios.post("/addMessage", message_info)
      .then(function(response){
        // console.log(response)
      });
  }

  getChatMessages() {
    var _this = this;
    // Calculate name of chat
    var chat_name = (this.props.is_fixture) ?
                        ("_fixture" + this.props.active_chat.FixtureID)
                        : ("_team" + this.props.active_chat.UserTeamID)
    var get_team_req = "getTeamMembers?team=" + this.props.active_chat.UserTeamID
    var get_chat_req = "getChatMessages?name=" + chat_name
    // Get Team Members
    axios.get(get_team_req)
        .then(function(result) {
          _this.setState({
            team_members: result.data
          });
          // Once Team Members loaded can load messages
          axios.get(get_chat_req)
              .then(function(result) {
                if (result.data != null) {
                  _this.setState({
                    messages: result.data
                  });
                } else {
                  _this.setState({
                    messages: []
                  });
                }
                var messageBox = document.getElementById("MessageBox");
                messageBox.scrollTop = messageBox.scrollHeight;
              })
        })
  }


  componentDidUpdate(prevProps) {
    if (prevProps.active_chat.UserTeamID !== this.props.active_chat.UserTeamID
        || prevProps.active_chat.OppID !== this.props.active_chat.OppID) {
     this.setState({
       messages: [{
         sender_name: "...",
         message: "..."
       }]
     })
     this.getChatMessages();
    }
  }

  componentDidMount() {
    this.getChatMessages()
  }


  chatName(chat) {
    if (chat.FixtureID == -1) {
      return chat.UserTeamName
    } else {
      return chat.UserTeamName + " vs " + chat.OppName
    }
  }


  render() {
    var prev_sender = -1
    return (
      <div class="ChatPanel">
        <div class="ChatHeader">
          <h1>{this.chatName(this.props.active_chat)}</h1>
        </div>
        <div id="MessageBox" class="MessageBox">
          { (this.state.messages.length > 0) ?
            this.state.messages.map((message) => {
              var is_subequent = prev_sender != message.SenderID
              prev_sender = message.SenderID
              return (<MessageCard is_subsequent={is_subequent} sender_id={message.SenderID} sender_name={message.SenderName}
                  message={message.Message} is_fixture={this.props.is_fixture}
                  team_members={this.state.team_members}/>)
            })
            : (<h3> No messages yet, send the first </h3>)
          }
        </div>
        <div class="MessageEntry">
          <input
            id="MessageEntry"
            type="text"
            onChange={e => this.inputChange(e)}
            value={this.state.message}
            onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.sendMessage()
                }
              }}/>
            <button class="SendButton" onClick={() => this.sendMessage()}>Send</button>
        </div>

      </div>
        );
    }
}

export default OpenChat;
