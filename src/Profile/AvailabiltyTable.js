import React from 'react';
import './Stylesheets/AvailabilityTable.css';

var axios = require('axios');

export default class AvailabiltyTable extends React.Component {

    state = {
        availabilities: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]
    }

    // componentDidMount() {
    //   var _this = this;
    //   this.serverRequest =
    //     axios
    //       .get("availabilities.json")
    //       .then(function(result) {
    //         _this.setState({
    //           availabilities: result.data.availabilities
    //         });
    //       })
    // }
    // componentDidMount() {
    //   var _this = this;
    //   this.serverRequest =
    //     axios
    //       .get("promoted_fixtures.json")
    //       .then(function(result) {
    //         _this.setState({
    //           availabilities: result.data.fixtures
    //         });
    //       })
    // }

    createTable = () => {
        let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
        let rows = []
        let row = []
        row.push(<td></td>)
        for (let i = 8; i < 24; i++) {
            row.push(<td>{i}:00</td>)
        }
        rows.push(<tr>{row}</tr>)
        for (let i = 0; i < 7; i++) {
            row = []
            row.push(<td>{days[i]}</td>)
            for (let j = 8; j < 24; j++) {
                row.push(<td id={"av" + i + "_" + j} class={(j >= 17) ? "checked" : "unchecked"}></td>)
            }
            rows.push(<tr>{row}</tr>)
        }
        return rows
    }


    render() {
        return (
            <table>
                {this.createTable()}
            </table>
        )
    }
}
