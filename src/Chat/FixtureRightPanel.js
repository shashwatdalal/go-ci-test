import React, {Component} from 'react';

class FixtureRightPanel extends Component {

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
    return (<h2> "Right panel component for a fixture chat." </h2>)
    }
}

export default FixtureRightPanel;
