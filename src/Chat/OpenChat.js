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

  scrollChat() {
    var messageBox = document.getElementById("MessageBox");
    messageBox.scrollTop = messageBox.scrollHeight;
  }

  sendMessage() {
    var d = new Date();
    var time = d.getTime();
    var new_message = {
      Sender:"Marcel",
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
    var team_name = "team1"
    var request = '/addMessage?team=' + team_name
    axios.post(request, new_message)
      .then(function(response){
        console.log(response)
      });
  }


  componentDidMount() {
    var _this = this;
    this.serverRequest =
      axios
        .get("getChatMessages?team=team1")
        .then(function(result) {
          _this.setState({
            chat_name: "\"Testing\"",
            messages: result.data
          });
            var messageBox = document.getElementById("MessageBox");
            messageBox.scrollTop = messageBox.scrollHeight;
        })
  }

  render() {
    console.log()
    return (
      <div class="ChatPanel">
        <div class="ChatHeader">
          <h1>{this.state.chat_name}</h1>
        </div>
        <div id="MessageBox" class="MessageBox">
          {
            this.state.messages.map(message => (<MessageCard data={message} />))
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
