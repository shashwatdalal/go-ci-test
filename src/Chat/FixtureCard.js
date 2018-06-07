import React, { Component } from 'react';
import './Stylesheets/FixtureCard.css';

class FixtureCard extends Component {
  state = {
    upvoted: false,
    downvoted: false
  }

  toggle_upvote() {
    // Write upvote to file, check if upvote already in file
    if (this.state.downvoted) {
      this.setState({
        downvotes: this.state.downvotes - 1,
        upvotes: this.state.upvotes + 1,
        upvoted: true,
        downvoted: false
      })
    } else if (this.state.upvoted) {
      this.setState({
        upvotes: this.state.upvotes - 1,
        upvoted: false
      })
    } else {
      this.setState({
        upvotes: this.state.upvotes + 1,
        upvoted: true
      })
    }
  }


  toggle_downvote() {
    // Write downvote to file, check if upvote already in file
    if (this.state.upvoted) {
      this.setState({
        upvotes: this.state.upvotes - 1,
        downvotes: this.state.downvotes + 1,
        upvoted: false,
        downvoted: true
      })
    } else if (this.state.downvoted) {
      this.setState({
        downvotes: this.state.downvotes - 1,
        downvoted: false
      })
    } else {
      this.setState({
        downvotes: this.state.downvotes + 1,
        downvoted: true
      })
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
