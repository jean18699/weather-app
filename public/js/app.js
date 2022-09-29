

console.log('Client side javascript is loaded!');


/*fetch("http://localhost:3000/weather?address=Boston").then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error)
        }
        else
        {
            console.log(data);
        }
    });
    */
    
const form = document.querySelector('form');
const searchedLocation = document.querySelector('input');

const forecastCity = document.querySelector("#city");
const forecastMessage = document.querySelector('#forecast');


form.addEventListener('submit', (e)=>{
    e.preventDefault(); //evita que se recargue la pagina al hacer submit
    const location = searchedLocation.value
    forecastCity.innerHTML = 'Loading...';
    forecastMessage.innerHTML = ''; 
    
    fetch( `/weather?address=${location}`)
        .then(response => response.json())
        .then(data => { 
            if(data.error){
                console.error("Not results found for this location");
                forecastCity.innerHTML = 'Results not found for this location';
              
            }
            else
            {
                console.log(data);
                forecastCity.innerHTML = 'Forecast for ' + data.city + ':';
                forecastMessage.innerHTML = data.forecast;
            }
        })

    /*fetch(`http://localhost:3000/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                console.error("Not results found for this location");
            }
            else
            {
                console.log(data);
                forecastCity.innerHTML = 'Forecast for ' + data.city;
                forecastMessage.innerHTML = data.forecast;
            }
           
        });
    });*/
});



/*response.json().then((err, data)=>{
        if(err){
            console.log(err)
        }
        else
        {
            console.log(data)
        }
    });
   */ 
