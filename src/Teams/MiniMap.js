import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import "./Stylesheets/MainGrid.css"
import Popover from "react-bootstrap/es/Popover";

const AnyReactComponent = ({text}) => <div class="circle">{text}</div>;

class SimpleMap extends Component {

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{height: '40vh', width: '100%'}}>
                <GoogleMapReact
                    bootstrapURLKeys={{key: "AIzaSyC8Ux3avYGKFFPFl3EEmHVOqqRF4sfBJdk"}}
                    defaultCenter={{
                        lat: 51.50,
                        lng: -0.1
                    }}
                    defaultZoom={11}>
                    {this.props.team.players.map((p) => p.location ?
                        <Popover
                            id="popover-basic"
                            placement="right"
                            title={p.name}
                            positionTop={-70}
                            lat={p.location.lat}
                            lng={p.location.lng}>
                            <img src={p.image}/>
                        </Popover>
                        : null)}
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap