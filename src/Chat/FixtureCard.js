import React, { Component } from 'react';
import './Stylesheets/FixtureCard.css';

class FixtureCard extends Component {
  state = {
    upvotes: 3,
    downvotes: 0,
    upvoted: false,
    downvoted: true
  }

  toggle_upvote() {
    // Write upvote to file, check if upvote already in file
    {console.log("toggle_upvote");}
    this.state.upvotes++;
    if (this.state.downvoted) {
      this.setState = {
        downvotes: this.state.downvotes--,
        upvotes: this.state.upvotes++,
        upvoted: true,
        downvoted: false
      }
    } else if (this.state.upvoted) {
      this.setState = {
        upvotes: this.state.upvotes--,
        upvotes: false
      }
    } else {
      this.setState = {
        upvotes: this.state.upvotes++,
        upvoted: true
      }
    }
  }


  toggle_downvote() {
    // Write downvote to file, check if upvote already in file
    {console.log("toggle_downvote");}
    this.state.downvotes++;
    if (this.state.upvoted) {
      this.setState = {
        upvotes: this.state.upvotes--,
        downvotes: this.state.downvotes++,
        upvoted: false,
        downvoted: true
      }
    } else if (this.state.downvoted) {
      this.setState = {
        downvotes: this.state.downvotes--,
        downvoted: false
      }
    } else {
      this.setState = {
        downvotes: this.state.downvotes++,
        downvoted: true
      }
    }
  }

  render() {
    return <div class="card">
        <div class="team"> {this.props.data.Name} </div>
        <div class="venue">{this.props.data.Location}</div>
        <div class="date"> {this.props.data.StartTime + " to " + this.props.data.EndTime}</div>
        <div class="sport">{this.props.data.Sport}</div>
        <div class="upvote">
          <div class={this.state.upvoted ? 'arrow-up-selected': 'arrow-up'}
            onClick={() => this.toggle_upvote()}></div>
              {this.state.upvotes}
        </div>
        <div class="downvote">
          <div class={this.state.downvoted ? 'arrow-down-selected': 'arrow-down'}
            onClick={() => this.toggle_downvote()}></div>
              {this.state.downvotes}
        </div>
      </div>
  }
}


export default FixtureCard;
