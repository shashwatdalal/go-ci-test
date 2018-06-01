import React, { Component } from 'react';
import './Stylesheets/MessageCard.css';

const FixtureCard = props => {
  return <div class={(props.data.sender=="Marcel") ? "sent":"received"}>
    <div class={(props.data.sender=="Marcel") ? "message_sender_sent":"message_sender_received"}> {props.data.sender} </div>
    <div class={(props.data.sender=="Marcel") ? "message_sent":"message_received"}> {props.data.message} </div>
  </div>
}

export default FixtureCard;
