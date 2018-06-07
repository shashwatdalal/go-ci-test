import React, {Component} from 'react';
import './Stylesheets/FixtureCard.css';

const FixtureCard = props => {
    return <div class="card">
        <div class="team"> {props.data.Name} </div>
        <div class="date"> {props.data.StartTime} </div>
        <div class="date">{props.data.EndTime}</div>
        <div class="venue">{props.data.Location}</div>
        <p>{props.data.Sport}</p>
    </div>
}

export default FixtureCard;
