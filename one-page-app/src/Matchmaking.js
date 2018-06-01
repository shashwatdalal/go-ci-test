import React, {Component} from 'react';
import axios from 'axios';

import LocationPicker from 'react-location-picker';

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
            address: "",
            position: {
                lat: 0.0,
                lng: 0.0,
            }
        }
        this.setValue = this.setValue.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
    }


    setValue(field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    }

    handleSubmit(event) {
        var url = "http://localhost:3000/echo?";

        url += encodeURIComponent(document.getElementById('input1').value).replace(/%20/g, "+");
        url += encodeURIComponent()
        url += encodeURIComponent(document.getElementById('input4').value).replace(/%20/g, "+");

        axios.get(url).then(response => console.log(response));

    }

    handleLocationChange({position, address}) {
        this.setState({ position, address });
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

                        {/*Location*/}
                        {/*<br />*/}
                        {/*<input type='text' name='Latitude' id='input2'/>*/}
                        {/*<br />*/}
                        {/*<input type='text' name='Longitude' id='input3'/>*/}
                        {/*<br />*/}

                        <LocationPicker
                            containerElement={ <div style={ {height: '100%'} } /> }
                            mapElement={ <div style={ {height: '400px'} } /> }
                            defaultPosition={defaultPosition}
                            radius = {parseInt(this.state.Radius)}
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

                        {/*Available Dates*/}
                        {/*<br />*/}
                        {/*<input value="Availability" type='datetime-local' name='Available dates' id='input5'/>*/}
                        {/*<br />*/}

                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>


        )
    }
}


export default Matchmaking;
