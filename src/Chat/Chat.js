import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FixtureList from './FixtureList';
import ChatList from './ChatList';
import OpenChat from './OpenChat';
import '../Stylesheets/Chat.css';

class Chat extends Component {
  state = {
    active_chat: "No Chats Available, Join a team"
  }


  setActiveChat(chat) {
    this.setState({
      active_chat: chat
    })
  }

  render() {
      var _this = this
      return (
          <div class="chat_wrapper">
              <div id="chatlist" class="sidemenu">
                <ChatList active_chat={this.state.active_chat}
                          setActiveChat={(chat) => _this.setState({active_chat: chat})}/>
              </div>
              <div id="body" class="body">
                <OpenChat active_chat={this.state.active_chat}/>
              </div>
              <div id="fixtures" class="fixtures">
                <FixtureList active_chat={this.state.active_chat}/>
              </div>
          </div>
      )
    }
}


export default Chat;
