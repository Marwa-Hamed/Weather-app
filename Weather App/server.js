// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 8000;
app.listen(port, listening);

function listening(){
    console.log(`server runing: ${port}`)
}

//get function
app.get('/allData', senData);

function senData(_req, res) {
    res.send(projectData);
}

//post function
app.post('/addData', addData);

function addData(req, res) {
    entryHolder = {
        date: req.body.date,
        temp: req.body.temp,
        content: req.body.content,
    }
    projectData = entryHolder
    console.log(projectData);
    res.status(200).send({status: 'OK'})

}