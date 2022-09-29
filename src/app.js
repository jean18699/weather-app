
const express = require('express');
const path = require('path');
const hbs = require('hbs')
const bodyParser = require('body-parser');
const geocode = require("../public/js/geocode");
const forecast = require("../public/js/forecast");


//console.log(__dirname); // obtener la ruta del directorio donde se encuentra este archivo
//console.log(__filename);; // obtener la ruta de este archivo

//console.log(path.join(__dirname, '../..'));

// Define paths for express config
const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, './templates/views');
const partialsPath = path.join(__dirname, './templates/partials');


// Express config
app.use(express.static(publicDirectoryPath)); // Setup static directory to serve
app.set('view engine', 'hbs'); // configure handlebars view/template engine
app.set('views', viewPath); // configure path of the view folders
hbs.registerPartials(partialsPath);
app.use(bodyParser.urlencoded());


app.get('', (req, res)=>{
    res.render('index', { // res.render sirve para cargar views como respuesta
        title: 'Weather',
        name: 'Jean Carlos'
        //weather: ''
    })  
});

app.get('/location', (req, res)=>{
    console.log(req.query)
   /* const {location} = req.body;
    
    if(location)
    {
        const cityWeather = getWeather(location);
        res.send(cityWeather)
        /*res.render('index', {
            title: 'Weather',
            weather: cityWeather, 
            name: 'Jean Carlos'
        })
    }else
    {
        //  const cityWeather = getWeather(location);
        res.render('index', {
            title: 'Weather',
            weather: 'Not found', 
            name: 'Jean Carlos'
        })
    }*/
    
});

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Jean Carlos',
        imgDir: "/img/istockphoto-184276818-612x612.jpg"
        
    });
});

app.get('/help', (req, res)=>{
    res.render('help', 
    {
        title: 'Help',
        name: 'Jean Carlos'
    })
});



app.get('/help/*', (req, res)=>{
    res.render('404', 
    {
        title: '404',
        name: 'Jean Carlos',
        errorMessage: 'Help Article Not Found'
    })
});

app.get('/weather', (req, res)=>{

    const address = req.query.address;
    
    if(address){
        
        geocode(address, (error, {latitude, longitude} = {})=>{
            if(error){
                return res.send({error})
            }
            else
            {
              forecast(latitude, longitude, (error, weather)=>{
                if(error){
                    res.send({error})
                }
                else
                {
                    res.send({
                        city: address,
                        forecast: weather
                    })
                    /*res.render('index',
                    {
                        title: 'Weather',
                        name: 'Jean Carlos',
                        weather: weather
                    })*/
                }
                })
            }
        })
    }
    else
    {
        return res.send({
            error: 'You must provide a search term'
        });
    }
  

});

// Si usamos un wildcard para manejar direcciones
// que no existen debemos poner la funcion al final o
// sera la que sera llamada antes de la ruta correta.
app.get('*', (req, res)=>{
    res.render('404', 
    {
        title: '404',
        name: 'Jean Carlos',
        errorMessage: 'Page not Found'
    })
});


app.listen(port, ()=>{
    console.log(`Server is up on port ${port}`)
});

