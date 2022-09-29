const request = require('request');


const forecast = (latitude, longitude, callback)=>{
    const url = `http://api.weatherstack.com/current?access_key=0ce33c1538c8caa0a6f614b455bc0526&query=${longitude},${latitude}`;
    request({url, json:true}, (error, {body})=>{
        
        if(error){
          callback('Unable to fetch the forecast', undefined);
        }
        else if(body.error){
          callback('Not results were found for this location', undefined);
        }
        else{

            //with ":" I can rename attributes
            const {current: result} = body;

            const {temperature, feelslike:precipitation, weather_descriptions: weatherState} = result;
            callback(undefined, `${weatherState[0]}. It is currently ${temperature} degrees out. There is a ${precipitation}% chance of rain.`)
        }
    });
  
  }


  module.exports = forecast;