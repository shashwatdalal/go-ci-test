import React, {Component} from 'react';
import FixtureRightPanel from './FixtureRightPanel';
import TeamRightPanel from './TeamRightPanel';
import {Nav, NavItem} from 'react-bootstrap';

class ChatRightPanel extends Component {

  state = {
    active_key: "1"
  }

  handleSelect(key) {
    this.setState({
      active_key: key
    })
  }


  render() {
    var _this = this
    console.log(this.props.active_chat.FixtureID);
    console.log(this.props.active_chat.FixtureID);
    return (<div>{(this.props.active_chat.FixtureID !== -1) ? (<FixtureRightPanel fixture_id={this.props.active_chat.FixtureID}/>)
                                : (<TeamRightPanel team_id={this.props.active_chat.HomeID}/>)}</div>
      );
    }
}

export default ChatRightPanel;
