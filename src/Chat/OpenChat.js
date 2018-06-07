import React, { Component } from 'react';
import MessageCard from './MessageCard';
import './Stylesheets/OpenChat.css';

var axios = require('axios');

class OpenChat extends Component {
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

  componentDidMount() {
    this.props.fetchMessages();
    scrollChat();
  }

  sendMessage() {
   this.props.sendMessage(this.state.message);
   scrollChat();
   this.setState(){
     message:""
   }
 }

  render() {
    return (
      <div class="ChatPanel">
        <div class="ChatHeader">
          <h1>{this.props.chat_name}</h1>
        </div>
        <div id="MessageBox" class="MessageBox">
          {
            this.props.messages.map(message => (<MessageCard data={message}/>))
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

  const mapStateToProps = state => ({
      chat_id: state.chat_id,
      chat_name: state.chat_name,
      messages: state.messages
  })
}
