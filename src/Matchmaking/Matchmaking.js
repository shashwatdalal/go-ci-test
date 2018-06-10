import React, {Component} from 'react';
import axios from 'axios';


import LocationPicker from 'react-location-picker';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import Select from 'react-select';
import 'react-select/dist/react-select.css';


import './Stylesheets/Forms.css';

const defaultPosition = {
    lat: 51.509865,
    lng: -0.118092
};

const refs = {}

const durationOptions = [
  { value : 60, label: '1 hour'},
  { value : 120, label: '2 hours'},
  { value : 180, label: '3 hours'},
  { value : 240, label: '4 hours'},
  { value : 300, label: '5 hours'},
  { value : 360, label: '6 hours'},
  { value : 420, label: '7 hours'},
  { value : 480, label: '8 hours'},
  { value : 540, label: '9 hours'},
  { value : 600, label: '10 hours'},
  { value : 660, label: '11 hours'},
  { value : 720, label: '12 hours'},
  { value : 780, label: '13 hours'},
  { value : 840, label: '14 hours'},
  { value : 900, label: '15 hours'},
  { value : 960, label: '16 hours'},
]

const sportOptions = [
  { value: 'Football', label: 'Football' },
  { value: 'Basketball', label: 'Basketball' },
  { value: 'Badminton', label: 'Badminton' },
  { value: 'Volleyball', label: 'Volleyball' },
  { value: 'Tennis', label: 'Tennis' },
  { value: 'Archery', label: 'Archery' },
]

class Matchmaking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Sport: '',
            Radius: 2000,
            address: 'London',
            position: {
                lat: 51.509865,
                lng: -0.118092
            },
            date: new Date(),
            Duration: 60,
            places: []
        }

        this.setValue = this.setValue.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPlacesChanged = this.onPlacesChanged.bind(this);
        this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this);
        this.handleSportChange = this.handleSportChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
    }

    onSearchBoxMounted(ref) {
        refs.searchBox = ref;
    }


    onPlacesChanged(){
        const places = refs.searchBox.getPlaces();
        this.setState({ places,});
        var lastvisited = places[places.length - 1];

        var object = {
            position: {
                lat: lastvisited.geometry.location.lat(),
                lng: lastvisited.geometry.location.lng(),
            },
            address: lastvisited.formatted_address
        };
        this.setState(object);
    }


    setValue(field, event) {
        var object = {};
        object[field] = event.target.value;
        this.setState(object);
    }

    handleSubmit(event) {
        event.preventDefault();
        var url = "/matchmaking?";
        var StartDate = moment.utc(this.state.Date);
        var EndDate = StartDate.clone().add(this.state.Duration.value, 'minutes');
        console.log(StartDate.format())
        console.log(EndDate.format())

        url += "StartDate=" + StartDate.format() + "&";
        url += "EndDate=" + EndDate.format() + "&";
        url += "Location=(" + this.state.position.lat + "," + this.state.position.lng + ')&';
        url += "Radius=" + this.state.Radius + "&";
        url += "Sport=" + this.state.Sport.value ;

        axios.get(url).then(response => console.log(response));

    }

    handleLocationChange({position, address}) {
        this.setState({position, address});
    }

    handleSportChange(Sport) {
        this.setState({Sport});
    		// selectedOption can be null when the `x` (close) button is clicked
    		if (Sport) {
        	 console.log(`Selected: ${Sport.label}`);
         }
    }


    handleDurationChange(Duration) {
        this.setState({Duration});
    		// selectedOption can be null when the `x` (close) button is clicked
    		if (Duration) {
        	 console.log(`Selected: ${Duration.label}`);
    		}
    }


    render() {
        return (
            <div class="form_wrapper">
                <div id="request_form">
                    <form onSubmit={this.handleSubmit}>

                        <br />
                        Sport
                        <br />

                        <Select
                          name="Sport"
                          value={this.state.Sport}
                          onChange={this.handleSportChange}
                          options={sportOptions}/>

                        <br />
                        Location
                        <br />

                        <StandaloneSearchBox
                          ref={this.onSearchBoxMounted}
                          bounds={this.bounds}
                          onPlacesChanged={this.onPlacesChanged}
                        >
                        <input
                          type="text"
                          placeholder="Search for your location"
                          style={{
                            boxSizing: `border-box`,
                            border: `1px solid transparent`,
                            width: `99%`,
                            height: `32px`,
                            padding: `0 12px`,
                            borderRadius: `3px`,
                            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                            fontSize: `14px`,
                            outline: `none`,
                            textOverflow: `ellipses`,
                          }}
                        />
                        </StandaloneSearchBox>

                        <br />
                        <LocationPicker
                            name='Location'
                            id='input2'
                            value={this.state.position}
                            containerElement={ <div style={ {height: '100%'} }/> }
                            mapElement={ <div style={ {height: '400px'} }/> }
                            defaultPosition={this.state.position}
                            radius={parseInt(this.state.Radius)}
                            onChange={this.handleLocationChange}
                        />
                        <br />

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


                        Duration
                        <br />

                        <Select
                          name="Duration"
                          value={this.state.Duration}
                          onChange={this.handleDurationChange}
                          options={durationOptions}/>
                        <br />

                        Availability
                        <br />
                        <div id='datetime'>
                            <DateTimePicker
                                value={this.state.date}
                                onChange={date => this.setState({date:date})}
                                autocomplete='organization'/>
                        </div>
                        <br />

                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>


        )
    }
}


export default Matchmaking;
