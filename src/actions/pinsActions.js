import {FETCH_PINS} from "./types";


export const fetchPins = (player,team) => dispatch => {
    console.log("fetching pins");
    fetch("https://maps.googleapis.com/maps/api/geocode/json?&address=" +
        encodeURI(player.location) + "&key=AIzaSyC8Ux3avYGKFFPFl3EEmHVOqqRF4sfBJdk")
        .then(res => res.json())
        .then(geoinfo => {
            dispatch({
                type: FETCH_PINS,
                payload: {
                    team: team,
                    player: player,
                    latlng: geoinfo.results[0].geometry.location
                }
            });
        });
};