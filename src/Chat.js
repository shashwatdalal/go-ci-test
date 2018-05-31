import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FixtureList from './Chat/FixtureList';
import ChatList from './Chat/ChatList';
import OpenChat from './Chat/OpenChat';
import './Stylesheets/Chat.css';

class Chat extends Component {
  render() { return (
    <div class="chat_wrapper">
      <div id="chatlist" class="sidemenu"><ChatList/></div>
      <div id="body" class="main"><OpenChat/></div>
      <div id="fixtures" class="fixtures"><FixtureList/></div>
    </div>
  )}
}


export default Chat;
