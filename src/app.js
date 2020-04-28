const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast');
const printError = require('../src/utils/printError');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static derectory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Sarwar'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About me',
        name: 'Sarwar',
        img:'./img/face.png'
    });
});

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'Help',
        name: 'Sarwar',
        msg: 'This is the help page message.'
    });
});

// app.get('/weather', (req,res) => {
//     res.send({
//         title: 'About',
//         name: 'Sarwar',
//         location: 'Sydney',
//         forecast: '38 degrees max with clear sky.'
//     });
// });

app.get('/weather', (req,res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            
            return res.send({
                location: forecastData[0],
                forecast: forecastData[1]
            });
        });
    });
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        });
    } else {
        console.log(req.query);
        console.log(req.query.search);
        res.send({
            products: []
        });
    }
});

app.get('/help/*', (req,res) => {
    res.render('404',{
        title: '404 Page',
        name: 'Sarwar',
        msg: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404',{
        title: 'Help 404 Page',
        name: 'Sarwar',
        msg: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server running on port ' + port);
});

