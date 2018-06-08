import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import "./Stylesheets/MainGrid.css"

const AnyReactComponent = ({text}) => <div class="circle">{text}</div>;

class SimpleMap extends Component {

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{height: '50vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyC8Ux3avYGKFFPFl3EEmHVOqqRF4sfBJdk"}}
                    defaultCenter={{
                        lat: 59.95,
                        lng: 30.33
                    }}
                    defaultZoom={1}
                >
                    {this.props.team.players.map(p => p.latlng ?
                        <AnyReactComponent
                            lat = {p.latlng.lat}
                            lng = {p.latlng.lng} /> : null)}
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap