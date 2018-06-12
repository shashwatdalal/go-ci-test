import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ChatList from './ChatList';
import OpenChat from './OpenChat';
import ChatRightPanel from './ChatRightPanel';
import '../Stylesheets/Chat.css';

class Chat extends Component {
  state = {
    active_chat: null
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
                {(this.state.active_chat != null) ?
                <OpenChat active_chat={this.state.active_chat}/>
                : (<h2>No Chats available</h2>)}
              </div>
              <div id="right_panel" class="right_panel">
                {(this.state.active_chat != null) ?
                  <ChatRightPanel/>
                  :<h2>Please join a team first</h2> }
              </div>

          </div>
      )
    }
}


export default Chat;
