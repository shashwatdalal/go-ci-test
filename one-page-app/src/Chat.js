import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FixtureList from './Chat/FixtureList';
import Jobs from './Chat/Jobs';
import './Stylesheets/Chat.css';

class Chat extends Component {
  render() { return (
    <div class="chat_wrapper">
      <div id="chatlist" class="sidemenu"></div>
      <div id="body" class="main"><Jobs/></div>
      <div id="fixtures" class="fixtures"><FixtureList/></div>
    </div>
  )}
}


export default Chat;
