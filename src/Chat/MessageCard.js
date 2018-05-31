import React, { Component } from 'react';
import './Stylesheets/MessageCard.css';

const FixtureCard = props => {
  return <div class={(props.data.sender=="Marcel") ? "sent":"received"}>
    <div class="sender"> {props.data.sender} </div>
    <div class="message"> {props.data.message} </div>
  </div>
}

export default FixtureCard;
