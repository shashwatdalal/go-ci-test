import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Popover from "react-bootstrap/es/Popover";

const AnyReactComponent = ({text}) => <div class="circle">{text}</div>;

class FixtureMap extends Component {

    render() {
      var _this = this
      return (
          // Important! Always set the container height explicitly
          <div style={{height: '50vh', width: '100%'}}>
              <GoogleMapReact
                  bootstrapURLKeys={{key: "AIzaSyC8Ux3avYGKFFPFl3EEmHVOqqRF4sfBJdk"}}
                  defaultCenter={{
                      lat: 51.50,
                      lng: -0.1
                  }}
                  defaultZoom={11}>
                  {this.props.fixtures.map((fixture) =>
                      <Popover
                          id="popover-basic"
                          placement="right"
                          title={fixture.Name}
                          positionTop={-70}
                          lat={fixture.LocLat}
                          lng={fixture.LocLng}
                          onClick={() => _this.props.setSelectedFixture(fixture)}>
                      </Popover>
                      : null)}
              </GoogleMapReact>
          </div>
      );
    }
}

export default FixtureMap
