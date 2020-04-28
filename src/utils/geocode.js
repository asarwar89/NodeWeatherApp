const request = require('request');

const geocode = (location, callback) => {
    const mapBoxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?limit=1&access_token=pk.eyJ1IjoiYXNhcndhcjg5IiwiYSI6ImNrOWRseng1bTAzbGwzbW81eG42MTkyeXEifQ.4mNrTgsr6a3_v08cE2Kd3g&limit=1';

    request({url: mapBoxUrl, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to MapBox!', undefined);
        } else if (!body.features.length){
            callback('Unable to identify location!', undefined);
        } else {
            const data = {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0]
            }
            callback(undefined, data);
        }
    });
}

module.exports = geocode;