import React, { Component } from 'react';
import MessageCard from './MessageCard';
import './Stylesheets/OpenChat.css';

var axios = require('axios');

class OpenChat extends Component {
  state = {
      chat_name: "Chat",
      messages: []
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

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  render() {
    return (
      <div class="ChatPanel">
        <h1>{this.state.chat_name}</h1>
        {
          this.state.messages.map(message => (<MessageCard data={message}/>))
        }
      </div>
    );
  }
}

export default OpenChat;
