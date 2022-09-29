const request = require('request');

const geocode = (address, callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiamVhbjE4Njk5IiwiYSI6ImNsN2podWJteTB5NWszcG9mdGh3OHN3azMifQ.X_2gb7qrDY4q8Bsci2q6xw";
    
    request.get(url, {json: true}, (err, {body})=>{

        const {features: results} = body

        if(err){
            callback('Cannot access the Geocode API', undefined);
        }
        else if(results.length === 0){
            callback('Not results found for this location', undefined)
        }
        else
        {
            const {center: data} = results[0];
          
            const latitude = data[0];
            const longitude = data[1];
           
            callback(undefined, {latitude, longitude})
        } 
    });
}

module.exports = geocode



/*correo reclamacion: reclamos@banreservas.com 
numero de reclamacion = 1-14427334630 (en el asunto junto con el nombre)*/