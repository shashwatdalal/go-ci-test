import React, { Component } from 'react';
import FixtureCard from './FixtureCard';
import './FixtureList.css';

class FixtureList extends Component {

  state = {
    items: [
      {
        id:0,
        team:"Firemen Five",
        date:"16/06/2018",
        venue: "Westway"
      },
      {
        id:1,
        team:"Hammersmith FC",
        date:"12/06/2018",
        venue:"Westway"
      },
      {
        id:2,
        team: "Tom's Tanks & Engines",
        date:"13/06/2018",
        venue:"Ethos"
      }
    ]
  };

  render() {
    return (
      <div>
        <h1>Fixtures</h1>
        {
          this.state.items.map(item => (<FixtureCard key={`li-${item.id}`} data={item}/>))
        }
      </div>
    );
  }
}

export default FixtureList;
