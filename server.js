// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const app = express();
const port = 8000;

// Start up an instance of app
app.listen(port, () => {console.log(`Server running on localhost:${port}`)})
/* Middleware*/
const bodyParser = require('body-parser');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server

app.post('/add', (req, res) => {
	// Save the data in projectData object
	projectData['temp'] = req.body.temp;
	projectData['date'] = req.body.date;
	projectData['feeling'] = req.body.feeling;
	res.send(projectData);
})

app.get('/getData', (req, res) => {
	res.send(projectData)
})