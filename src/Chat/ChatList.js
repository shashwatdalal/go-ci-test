import React, {Component} from 'react';
import ChatOverviewCard from './ChatOverviewCard';
import {ListGroup} from 'react-bootstrap';
import './Stylesheets/ChatList.css';

var axios = require('axios');

class ChatList extends Component {
    state = {
      active_chat: "none",
      chats: []
    }

    componentDidMount() {
        var _this = this;
        this.serverRequest =
            axios
                .get("chats.json")
                .then(function (result) {
                    _this.setState({
                        chats: result.data.chats
                    }, _this.initialiseActiveChat())
                })
    }

    initialiseActiveChat() {
      if (this.state.chats.length != 0) {
        this.props.setActiveChat(this.state.chats[0].Name)
      }
    }
    generateChatCard(chat) {
      var _this = this
      return (<div class={(chat.name == this.props.active_chat) ? "activeChatCardHolder" : "chatCardHolder"}
                onClick={() => this.props.setActiveChat(chat.name)}>
                  <ChatOverviewCard key={`li-${chat.id}`} data={chat}/>
              </div>)
    }

    render() {
        return (
            <div class="ChatList">
                <h1>Chats</h1>
                <ListGroup>
                {
                    this.state.chats.map(chat => this.generateChatCard(chat))
                }
                </ListGroup>
            </div>
        );
    }
}

export default ChatList;
