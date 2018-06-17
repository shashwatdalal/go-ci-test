import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ChatList from './ChatList';
import OpenChat from './OpenChat';
import ChatRightPanel from './ChatRightPanel';
import Pusher from 'pusher-js';
import './Stylesheets/Chat.css';
import ActiveUserID from '../Profile/ActiveUserID'

var axios = require('axios');

class Chat extends Component {
  state = {
    active_chat: null,
    chats: [],
    pusher: new Pusher('112f8743d26528cd9b7e', {
        cluster: 'eu',
        encrypted: true
      }),
    channel: null
  }

  initialiseActiveChat() {
    if (this.state.chats.length != 0) {
      this.setActiveChat(this.state.chats[0].Name)
    }

  }
  getChats() {
    var _this = this;
    var query = "getChats?userID=" + ActiveUserID.getID()
    this.serverRequest =
        axios
            .get(query)
            .then(function (result) {
                if (result.data != null) {
                  _this.setState({
                      chats: result.data
                  }, _this.initialiseActiveChat())
                }
            })
  }

  componentDidMount() {
    this.getChats()
  }

  getChatName(chat) {
    var name = (chat.FixtureID !== -1) ?
                        ("_fixture" + chat.FixtureID)
                        : ("_team" + chat.UserTeamID)
    console.log(name)
    return name
  }

  setActiveChat(chat) {
    console.log("Setting active_chat");
    if (this.state.active_chat != null) {
      console.log("Unsubscribing from channel")
      this.state.pusher.unsubscribe(this.getChatName(this.state.active_chat))
    }
    this.setState({
      channel: this.state.pusher.subscribe(this.getChatName(chat)),
      active_chat: chat
    })
  }

  render() {
      var _this = this
      return (
          <div class="chat_wrapper">
              <div id="chatlist" class="sidemenu">
                <ChatList active_chat={this.state.active_chat}
                          chats={this.state.chats}
                          setActiveChat={(chat) => _this.setActiveChat(chat)}/>
              </div>
              <div id="body" class="body">
                {(this.state.active_chat != null) ?
                (<OpenChat active_chat={this.state.active_chat}
                is_fixture={this.state.active_chat.FixtureID != -1}
                channel={this.state.channel}/>)
                : (<h3>Select a chat in the left panel to view it</h3>)}
              </div>
              <div id="right_panel" class="right_panel">
                {(this.state.active_chat != null) ?
                  <ChatRightPanel active_chat={this.state.active_chat} get_chats={() => this.getChats()}/>
                  :<h3>Options relevant to chat will appear here</h3>}
              </div>
          </div>
      )
    }
}


export default Chat;
