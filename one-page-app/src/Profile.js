import React, { Component } from 'react';
import './Stylesheets/master.css'
import './Stylesheets/profile.css'

class Profile extends Component {
  render() {
    return (
      <div id='contentpanel'>
        <div id='contentcontainer'>
          <div id="chatlist" class="sidemenu"><ProfilePic/></div>
          
        </div>
      </div>
    );
  }
}


export default Profile;
