import React, { Component } from 'react';
import './Stylesheets/ChatOverviewCard.css';

const ChatOverviewCard = props => {
  return <div class="ChatCard">
    <div class="image">
      <img src={props.data.image} class="circleimg" alt="Chat head"/>
    </div>
    <div class="chat_name"> {props.data.name} </div>
    <div class="recent_message"><strong>{props.data.recent_message_sender}: </strong>{props.data.recent_message}</div>
  </div>
}

export default ChatOverviewCard;
