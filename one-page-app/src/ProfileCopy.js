import React, { Component } from 'react';
import './Stylesheets/master.css'
import './Stylesheets/profile.css'

class Profile extends Component {
  render() {
    return (
      <div id='contentpanel'>
        <div id='contentcontainer'>
          <table id='userinfo'>
            <thead>
              <td colspan="2">
                <img src="img/matchmakingbutton.jpg" class="circleimg" alt="Profile Picture" />
              </td>
            </thead>
            <tr>
              <td>
                Name: Andy Mingren Li
              </td>
              <td>
                Age:
              </td>
            </tr>
            <tr>
              <td colspan="2">
                Bio: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nunc nibh, bibendum rhoncus facilisis sed, finibus a massa. Curabitur lectus ipsum, imperdiet non felis ac, blandit tempus nunc. Cras nec ultrices urna. Curabitur bibendum nisi nec accumsan lobortis. Nunc bibendum libero ut magna sollicitudin, in mattis est egestas. Pellentesque pellentesque mauris at nibh varius, at hendrerit tellus consectetur. In pellentesque efficitur mi, at auctor quam suscipit at.

                In consectetur lacus vel lectus semper, quis porta libero mattis. Aenean tempus, felis vitae suscipit scelerisque, ligula quam varius dui, ut bibendum mauris risus vel mi. Integer vel aliquet sapien. Duis rhoncus tortor vitae varius scelerisque. Phasellus eleifend varius odio at maximus. Duis enim ante, pretium non elementum vel, iaculis id nunc. Cras semper felis pretium faucibus suscipit. Aenean id semper odio. Nulla porttitor nulla leo, at efficitur mauris sodales non. Donec non ultrices sem. Quisque vel erat rhoncus, molestie lorem eget, elementum enim. Fusce non consectetur urna.
              </td>
            </tr>
            <tr>
              <td colspan="2">
                Sports Andy plays:
              </td>
            </tr>
            <tr>
              <td>
                Chripsing
              </td>
              <td>
                Fisting
              </td>
            </tr>

          </table>

        </div>
      </div>);
  }
}


export default Profile;
