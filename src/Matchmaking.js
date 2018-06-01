import React, {Component} from 'react';
import axios from 'axios';

import LocationPicker from 'react-location-picker';
import TimeDurationPicker from 'rc-time-duration-picker';
import DateTimePicker from 'react-datetime-picker';
import * as Datetime from 'react-datetime';
import moment from 'moment';

import './Matchmaking/Stylesheets/datetime.css';


const defaultPosition = {
    lat: 51.509865,
    lng: -0.118092
};

class Matchmaking extends Component {

    constructor(props) {
        super(props);


        this.state = {
            Sport: "",
            Radius: 2000,
            address: "London",
            position: {
                lat: 51.509865,
                lng: -0.118092
            },
            date: new Date(),
            Duration: 30
        }
        this.setValue = this.setValue.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    setValue(field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    }

    handleSubmit(event) {
        event.preventDefault();
        var url = "http://localhost:3000/echo?";
        var StartDate = moment(this.state.Date);
        var EndDate = StartDate.add(this.state.Duration, 'minute');
        url += "Sport=" + this.state.Sport + "&";
        url += "Location=(" + this.state.position.lat + "," + this.state.position.lng + ')&';
        url += "Radius=" + this.state.Radius + "&";
        url += "StartDate=" + StartDate.format() + "&";
        url += "EndDate=" + EndDate.format();

        axios.get(url).then(response => console.log(response));


    }

    handleLocationChange({position, address}) {
        this.setState({position, address});
    }

    render() {
        return (
            <div class="form_wrapper">

                <div id="request_form">
                    <form onSubmit={this.handleSubmit}>

                        <br />

                        Sport
                        <br />
                        <input value={this.state.Sport}
                               type='text'
                               name='Sport'
                               id='input1'
                               onChange={this.setValue.bind(this, 'Sport')}/>
                        <br />

                        Location
                        <LocationPicker
                            name='Location'
                            id='input2'

                            value={this.state.position}
                            containerElement={ <div style={ {height: '100%'} }/> }
                            mapElement={ <div style={ {height: '400px'} }/> }
                            defaultPosition={defaultPosition}
                            radius={parseInt(this.state.Radius)}
                            onChange={this.handleLocationChange}
                        />

                        Radius
                        <br />
                        <input
                            value={parseInt(this.state.Radius)}
                            min="2000"
                            max="50000"
                            step="1000"
                            type='range'
                            name='Radius'
                            id='input4'
                            onChange={this.setValue.bind(this, 'Radius')}/>
                        <br />

                        Availability
                        <br />

                        <div id='datetime'>
                            <DateTimePicker
                                value={this.state.date}
                                onChange={date => this.setState({date:date}) }/>
                        </div>
                        <br />


                        Duration
                        <br /><input value={parseInt(this.state.Duration)}
                                     type='text'
                                     name='Duration'
                                     id='input1'
                                     onChange={this.setValue.bind(this, 'Duration')}/>
                        <br />


                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>


        )
    }
}


export default Matchmaking;
