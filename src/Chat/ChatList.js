import React, { Component } from 'react';
import ChatOverviewCard from './ChatOverviewCard';
import './Stylesheets/ChatList.css';

var axios = require('axios');

class ChatList extends Component {
  state = {
      chats: []
  }

  componentDidMount() {
    var _this = this;
    this.serverRequest =
      axios
        .get("chats.json")
        .then(function(result) {
          _this.setState({
            chats: result.data.chats
          });
        })
  }

  componentWillUnmount() {
    this.serverRequest.abort();
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
}

export default ChatList;
