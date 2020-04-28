const request = require('request');

const forecast = (lat,long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=441e8a8839c89a630ebff2c5805674cd&query=' + lat + ',' + long;
  
    request({ url: url, json: true }, (error, {body:data}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined);
        } else if (data.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, [
                'Location is ' + data.location.name + ', ' + data.location.country,
                'It is currently ' + data.current.temperature + ' degrees out at ' + data.location.name + '. It feels like ' + data.current.feelslike + ' degress.'
            ]);
        }
    });
    
}

module.exports = forecast;