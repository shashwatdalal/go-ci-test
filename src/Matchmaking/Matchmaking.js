import React, {Component} from 'react';
import axios from 'axios';
import LocationPicker from 'react-location-picker';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
import Select from 'react-select';
import UserProfile from '../Profile/UserProfile';
import 'react-select/dist/react-select.css';
import './Stylesheets/Forms.css';
import '../Stylesheets/Searchbox.css';

const defaultPosition = {
    lat: 51.509865,
    lng: -0.118092
};

const refs = {}

const durationOptions = [
  { value : 60,  label: '1 hour'},
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

const playersOptions = [
  { value : 1,    label: 'One player'},
  { value : 2,    label: 'Two players'},
  { value : 3,    label: 'Three players'},
  { value : 4,    label: 'Four players'},
  { value : 5,    label: 'Five players'},
  { value : 6,    label: 'Six players'},
  { value : 7,    label: 'Seven players'},
  { value : 8,    label: 'Eight players'},
  { value : 9,    label: 'Nine players'},
  { value : 10,   label: 'Ten players'},
  { value : 11,   label: 'Eleven players'},
  { value : 12,   label: 'Twelve players'},
  { value : 13,   label: 'Thirteen players'},
  { value : 14,   label: 'Fourteen players'},
  { value : 15,   label: 'Fifteen players'},
  { value : 16,   label: 'Sixteen players'},
  { value : 17,   label: 'Seventeen players'},
  { value : 18,   label: 'Eighteen players'},
  { value : 19,   label: 'Nineteen players'},
  { value : 20,   label: 'Twenty players'},

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
          Team: -1,
          Sport: "Football",
          Players: 1,
          Radius: 2000,
          address: 'London',
          position: {
              lat: 51.509865,
              lng: -0.118092
          },
          date: new Date(),
          Duration: 60,
          places: [],
          teamOptions: []
        }

        this.setValue = this.setValue.bind(this);
        this.handleLocationChange = this.handleLocationChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onPlacesChanged = this.onPlacesChanged.bind(this);
        this.onSearchBoxMounted = this.onSearchBoxMounted.bind(this);
        this.handleSportChange = this.handleSportChange.bind(this);
        this.handleDurationChange = this.handleDurationChange.bind(this);
        this.handleTeamChange = this.handleTeamChange.bind(this);
        this.handlePlayersChange = this.handlePlayersChange.bind(this);
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

        url += "teamid=" + this.state.Team + "&";
        url += "startdate=" + StartDate.format() + "&";
        url += "enddate=" + EndDate.format() + "&";
        url += "lat=" + this.state.position.lat + "&";
        url += "lng=" + this.state.position.lng + "&";
        url += "radius=" + this.state.Radius + "&";
        url += "sport=" + this.state.Sport.value + "&";
        url += "players=" + this.state.Players;

        axios.get(url).then(response => console.log(response));

    }

    handlePlayersChange(Players) {
        this.setState({Players});
        if (Players) {
           console.log(`Selected: ${Players.label}`);
        }
    }

    handleLocationChange({position, address}) {
        this.setState({position, address});
    }

    handleSportChange(Sport) {
        this.setState({Sport});
    		if (Sport) {
        	 console.log(`Selected: ${Sport.label}`);
        }
    }

    handleDurationChange(Duration) {
        this.setState({Duration});
    		if (Duration) {
        	 console.log(`Selected: ${Duration.label}`);
    		}
    }

    handleTeamChange(Team) {
      //
      var object = {};
      object['Team'] = Team.value;
      this.setState(object);

  		// selectedOption can be null when the `x` (close) button is clicked
  		if (Team) {
    	 console.log(`Selected: ${Team.label}`);
  		}
    }


    render() {
        return (
            <div class="form_wrapper">
                <div id="request_form">
                    <form onSubmit={this.handleSubmit}>
                    <div class="form_container">

                        <div id="players_container">
                          <br />
                          Players
                          <br />

                          <Select
                            name="Players"
                            value={this.state.Players}
                            onChange={this.handlePlayersChange}
                            options={playersOptions}/>
                        </div>
                        <div id="sport_container">

                          <br />
                          Sport
                          <br />

                          <Select
                            name="Sport"
                            value={this.state.Sport}
                            onChange={this.handleSportChange}
                            options={sportOptions}/>
                        </div>
                      </div>

                        <div class="form_container">
                          <div id = "duration">
                            <br />
                            Duration
                            <br />

                            <Select
                              name="Duration"
                              value={this.state.Duration}
                              onChange={this.handleDurationChange}
                              options={durationOptions}/>
                          </div>
                          <div id= "datetime">
                            <br />
                            Time
                            <br />

                            <DateTimePicker
                              value={this.state.date}
                              onChange={date => this.setState({date:date})}
                              autocomplete='organization'/>
                            <br />
                          </div>


                        </div>

                        <div class="form_container">
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
                            id = "searchBox"
                            required
                          />
                          </StandaloneSearchBox>

                          <br />
                          <LocationPicker
                              name='Location'
                              id='input2'
                              value={this.state.position}
                              containerElement={ <div style={ {height: '100%'} }/> }
                              mapElement={ <div style={ {height: '320px'} }/> }
                              defaultPosition={this.state.position}
                              radius={parseInt(this.state.Radius)}
                              onChange={this.handleLocationChange}
                          />

                          <br />
                          Radius
                          <br />

                          <input
                              value={this.state.Radius}
                              min="2000"
                              max="50000"
                              step="1000"
                              type='range'
                              name='Radius'
                              id='input4'
                              onChange={this.setValue.bind(this, 'Radius')}/>

                          <input type="submit" value="Submit" />
                        </div>

                    </form>
                </div>
            </div>


        )
    }
}


export default Matchmaking;
