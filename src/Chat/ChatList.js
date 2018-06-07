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
        {this.props.chats.map((chat, index) =>
            <div eventKey={chat.id} title={t.name}>
              (<ChatOverviewCard key={`chat-card-${chat.id}`} data={chat}/>))
            </div>
        )}
        {
          this.state.chats.map(chat => (<ChatOverviewCard key={`chat-card-${chat.id}`} data={chat}/>))
        }
      </div>
    );
  }

  const mapStateToProps = state => ({
      chats: state.chats
  })
}

export default ChatList;
