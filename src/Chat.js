import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FixtureList from './Chat/FixtureList';
import './Stylesheets/Chat.css';

class Chat extends Component {
  render() { return (
    <div class="chat_wrapper">
      <div id="root" class="main"></div>
      <div id="header" class="header"></div>
      <div id="menu" class="sidemenu"></div>
      <div id="fixtures" class="fixtures"><FixtureList/></div>
    </div>
  )}
}


export default Chat;
