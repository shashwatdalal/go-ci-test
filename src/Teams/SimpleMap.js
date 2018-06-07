import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import "./Stylesheets/MainGrid.css"
import {connect} from "react-redux";
import {fetchPins} from "../actions/pinsActions";

const AnyReactComponent = ({text}) => <div class="circle">{text}</div>;

class SimpleMap extends Component {

    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 1,
        pins: []
    };


    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{height: '50vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyC8Ux3avYGKFFPFl3EEmHVOqqRF4sfBJdk"}}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    {console.log(this.props.players)}
                    {this.props.players.map(player =>
                        <AnyReactComponent
                        lat={player.latlng.lat}
                        lng={player.latlng.lng}
                        text =""/>
                    )}
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;