import React, { Component } from 'react';
import './Stylesheets/MessageCard.css';

const FixtureCard = props => {
  return <div class={(props.data.Sender=="Marcel") ? "sent":"received"}>
    <div class={(props.data.Sender=="Marcel") ? "message_sender_sent":"message_sender_received"}> {props.data.Sender} </div>
    <div class={(props.data.Sender=="Marcel") ? "message_sent":"message_received"}>
      <div class={(props.data.Sender=="Marcel") ? "message_text_sent":"message_text_received"}>{props.data.Message}</div>
    </div>
  </div>
}

export default FixtureCard;
