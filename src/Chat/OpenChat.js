import React, { Component } from 'react';
import MessageCard from './MessageCard';
import './Stylesheets/OpenChat.css';

var axios = require('axios');

class OpenChat extends Component {
  state = {
      chat_name: "Chat",
      messages: [],
      message:""
  }

  inputChange(e) {
    const value = e.target.value;
    this.setState({
      message: value
    })
  }

  sendMessage() {
    this.setState({
      messages: [
        ...this.state.messages,
        {
          sender:"Marcel",
          message:this.state.message
        }
      ],
      message:""
    })
    var messageBox = document.getElementById("MessageBox");
    messageBox.scrollTop = messageBox.scrollHeight;
  }


  componentDidMount() {
    var _this = this;
    this.serverRequest =
      axios
        .get("chat.json")
        .then(function(result) {
          _this.setState({
            chat_name: result.data.chat_name,
            messages: result.data.chat_messages
          });
        })
  }

  render() {
    return (
      <div class="ChatPanel">
        <div class="ChatHeader">
          <h1>{this.state.chat_name}</h1>
        </div>
        <div id="MessageBox" class="MessageBox">
          {
            this.state.messages.map(message => (<MessageCard data={message}/>))
          }
        </div>
        <div class="MessageEntry">
          <input
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
