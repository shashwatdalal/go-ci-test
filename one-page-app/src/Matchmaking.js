import React, {Component} from 'react';
import axios from 'axios';

import LocationPicker from 'react-location-picker';


class Matchmaking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Sport: "",
            Latitude: 0.0,
            Longitude: 0.0,
            Radius: 2
        }
        this.handleSubmit = this.bind

    }


    setValue(field, event) {
        //If the input fields were directly within this
        //this component, we could use this.refs.[FIELD].value
        //Instead, we want to save the data for when the form is submitted
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    }

    handleSubmit(event) {
        var url = "http://localhost:9000/echo?"

        url += encodeURIComponent(document.getElementById('input1').value).replace(/%20/g, "+");
        url += encodeURIComponent(document.getElementById('input4').value).replace(/%20/g, "+");

        axios.get(url).then(response => console.log(response))

        event.preventDefault();
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

                        Radius
                        <br />
                        <input
                            value={this.state.Radius}
                            min="2"
                            max="50"
                            step="1"
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
                        <br />
                    </form>
                </div>
            </div>


        )
    }
}


export default Matchmaking;
