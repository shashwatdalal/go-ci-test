import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import FixtureList from './FixtureList';
import ChatList from './ChatList';
import OpenChat from './OpenChat';
import '../Stylesheets/Chat.css';

class Chat extends Component {
    render() {
        return (
            <div class="chat_wrapper">
                <div id="chatlist" class="sidemenu"><ChatList/></div>
                <div id="body" class="body"><OpenChat/></div>
                <div id="fixtures" class="fixtures"><FixtureList/></div>
            </div>
        )
    }
}


export default Chat;
