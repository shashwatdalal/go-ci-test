import React, { Component } from 'react';
import ChatOverviewCard from './ChatOverviewCard';
import './Stylesheets/ChatList.css';

var axios = require('axios');

class ChatList extends Component {
  componentDidMount() {
    this.props.fetchChats();
  }

  render() {
    return (
      <div class="ChatList">
        <h1>Chats</h1>
        {
          this.state.chats.map(chat => (<ChatOverviewCard key={`li-${chat.id}`} data={chat}/>))
        }
      </div>
    );
  }

  const mapStateToProps = state => ({
      chat_id: state.chat_id,
      chats: state.chats
  })
}

export default ChatList;
