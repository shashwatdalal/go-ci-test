import React from 'react';
import './Stylesheets/AvailabilityTable.css';
import UserProfile from '../UserProfile';

var axios = require('axios');

export default class AvailabiltyTable extends React.Component {
  state = {
    availability: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
  }

  numToDay(i) {
    switch (i) {
      case 0:
        return "Monday";
      case 1:
        return "Tuesday";
      case 2:
        return "Wednesday";
      case 3:
        return "Thursday";
      case 4:
        return "Friday";
      case 5:
        return "Saturday";
      case 6:
        return "Sunday";
      default:
        return "Error undefined index of day ("+ i + ")";
    }
  }

  componentDidMount() {
    var username = UserProfile.getName();
    axios.get("/getuseravail?username=" + username)
         .then(function(response) {
           var fstBitmap = parseInt(response.data.FstHalf);
           var sndBitmap = parseInt(response.data.SndHalf);
           var avail = this.bitmapToMatrix(fstBitmap, sndBitmap);
           this.setState({
             availability: avail
           })
         });
  }

  createTable = () => {
    let rows = []
    let row = []
    row.push(<td></td>)

    // Add times
    for (let i = 8; i < 24; i++) {
      row.push(<td>{i}:00</td>)
    }
    rows.push(<tr>{row}</tr>)

    // Add each cell
    for (let i = 0; i < 7; i++) {
      row = []

      // Add day
      row.push(<td>{this.numToDay(i)}</td>)
      for (let j = 0; j < 16; j++) {
        row.push(<td onClick={e => this.toggle(i, j, e)} id={"av" + i + "_" + j} class={this.state.availability[i][j] ? "checked" : "unchecked"}></td>)
      }
      rows.push(<tr>{row}</tr>)
    }
    return rows
  }

  // Toggle selection of an availability slot
  toggle(i, j, e) {
    if (this.state.availability[i][j]) {
      // Deselect
      document.getElementById("av" + i + "_" + j).classList.remove("checked");
      document.getElementById("av" + i + "_" + j).classList.add("unchecked");
      this.state.availability[i][j] = 0;
    } else {
      // Select
      document.getElementById("av" + i + "_" + j).classList.remove("unchecked");
      document.getElementById("av" + i + "_" + j).classList.add("checked");
      this.state.availability[i][j] = 1;
    }
  }

  // Convert the state availability matrix to a pair of bitmaps
  matrixToBitmap() {
    var av = this.state.availability;
    var res = new Array(2);

    // First bitmap (rows 0, 1, 2 and 3)
    var bitmap = 0;

    // Set and shift
    for (var col = 0; col < 16; col++) {
      for (var row = 0; row < 4; row++) {
        if (av[row][col]) {
          // Set to one
          bitmap = bitmap | 0x1;
          bitmap = bitmap << 1;
        }
      }
    }
    // Undo extra shift
    bitmap = bitmap >> 1;

    res[0] = bitmap;

    // Second bitmap (rows 4, 5 and 6)
    bitmap = 0;

    // Set and shift
    for (var col = 0; col < 16; col++) {
      for (var row = 4; row < 7; row++) {
        if (av[row][col]) {
          // Set to one
          bitmap = bitmap | 0x1;
          bitmap = bitmap << 1;
        }
      }
    }
    // Undo extra shift
    bitmap = bitmap >> 1;

    res[1] = bitmap;

    return res;
  }

  // Convert bitmaps into the state availability matrix
  bitmapToMatrix(fst, snd) {
    // Create new matrix
    var matrix = new Array(7) // 7 rows for the days

    for (var row = 0; row < 7; row++) {
      matrix[row] = new Array(16)
    }

    // Process first bitmap (rows 0, 1, 2 and 3)
    // Read and shift
    for (var col = 15; col >= 0; col--) {
      for (var row = 3; row >= 0; row--) {
        matrix[row][col] = fst & 0x1;
        fst = fst >> 1;
      }
    }

    // Process second bitmap (rows 4, 5 and 6)
    // Read and shift
    for (var col = 15; col >= 0; col--) {
      for (var row = 6; row >= 4; row--) {
        matrix[row][col] = snd & 0x1;
        snd = snd >> 1;
      }
    }
  }

  // Submit the modified availability to the server
  update(e) {
    e.preventDefault();

    // Create new availability matrix
    var newAvails = new Array(7) // 7 rows for the days

    for (var row = 0; row < 7; row++) {
      newAvails[row] = new Array(16)

      for (var col = 0; col < 16; col++) {
        var cell = document.getElementById("av" + row + "_" + col);
        if (cell.classList.contains("checked")) {
          newAvails[row][col] = 1;
        }
      }
    }

    // Set state to new matrix
    this.setState({
      availability: newAvails
    })

    // Convert matrix to two bitmap values
    var bitmaps = this.matrixToBitmap();
    var username = UserProfile.getName();

    // Send the bitmap values to the server
    axios.get("/updateuseravail?username" +
              username + "&fst=" + bitmaps[0] + "&snd=" + bitmaps[1])
         .then(function(response) {
           if (response.data == "fail") {
             alert("Failed to update availability, please try again.")
           }
         });
  }

  render() {
    return (
      <div>
        <table>
          {this.createTable()}
        </table>
        <h4 onClick={e => this.update(e)}>Submit</h4>
      </div>
    )
  }
}
