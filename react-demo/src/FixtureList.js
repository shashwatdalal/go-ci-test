import React, { Component } from 'react';
import './menu.css';

class FixtureList extends Component {

  state = {
    items: [
      {
        label:"Vs Firemen Five"
      },
      {
        label:"Vs Hammersmith FC"
      }
    ]
  };

  render() {
    return (
      <div>
        <h1>Fixtures</h1>
        <ul>
        {
          this.state.items.map(item => <li>{item.label}</li>)
        }
        </ul>
      </div>
    );
  }
}

export default FixtureList;
