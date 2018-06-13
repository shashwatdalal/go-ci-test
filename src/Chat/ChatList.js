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
        var query = "getChats?userID=" + ActiveUserID.getID()
        this.serverRequest =
            axios
                .get("getChats?userID=")
                .then(function (result) {
                    _this.setState({
                        chats: result.data
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
      return (<div class={(this.props.isActiveChat(chat)) ? "activeChatCardHolder" : "chatCardHolder"}
                onClick={() => this.props.setActiveChat(chat)}>
                  <ChatOverviewCard key={`li-${chat.id}`} data={chat}/>
              </div>)
    }

    render() {
        return (
            <div class="ChatList">
                <h1>Chats</h1>
                {(this.state.chats.length > 0) ?
                  (<ListGroup>{
                    this.state.chats.map(chat => this.generateChatCard(chat))
                  }</ListGroup>)
                  : (<h3> No chats available, Join/Create a team first </h3>)}
            </div>
        );
    }
}

export default ChatList;
