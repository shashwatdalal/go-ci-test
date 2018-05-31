import React, { Component } from 'react';
import './Stylesheets/FixtureCard.css';

const FixtureCard = props => {
  return <div class="card">
    <div class="team"> {props.data.team} </div>
    <div class="date"> {props.data.date} </div>
    <div class="venue">{props.data.venue}</div>
  </div>
}

export default FixtureCard;
