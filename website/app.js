/* Global Variables */
const url = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '';
const generate = document.getElementById('generate');

// Create a new date instance dynamically with JS

let d = new Date();
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

// Checking if zip code is a number

function isNum(x) {
	if (isNaN(x)) {
		return false;
	} else {
		return true;
	}
}

// Making sure zip code is a valid one

function isValidZipCode() {
	const zipCode = document.getElementById('zip').value;
	if (isNum(zipCode) && zipCode.toString().length == 5) {
		return true;
	} else {
		return false;
	}
}

// Sending request to openweathermap

const getWeather = async function (url, apiKey, zipCode) {
	query = `?zip=${zipCode}&appid=${apiKey}&units=metric`;
	const response = await fetch(url + query);
	const data = response.json()
	return data;
}

// Send data to server 

const postData = async (url = '', data = {}) => {
	const userFeeling = document.getElementById('feelings').value;
	const response = await fetch(url, {
		method: 'POST',
		credentials: 'same-origin',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			temp: data.data.main.temp,
			date: newDate,
			feeling: userFeeling
		})
	})
	console.log(`temp: ${data.data.main.temp} \n date: ${newDate} \n feeling: ${userFeeling}`);
	try {
		const newData = await response.json();
		return newData;
	} catch (error) {
		console.log(`Error: ${error}`);
	}
}

// Get all data from the server and update the UI 

const updateUI = async() => {
	const request = await fetch('/getData');
	try {
		const data = await request.json();
		document.getElementById('date').innerHTML = `Date: ${data.date}`;
		document.getElementById('temp').innerHTML = `Temperature: ${data.temp}`;
		document.getElementById('content').innerHTML = `You're feeling ${data.feeling}`;
	} catch (error) {
		console.log(`Error: ${error}`)
	}
}

// Adding event listener on the generate button and function to send get request to openweathermap

generate.addEventListener('click', function(e) {
	e.preventDefault();
	if (isValidZipCode()) {
		const zipCode = document.getElementById('zip').value;

		// Getting the weather and sending it to server

		getWeather(url, apiKey, zipCode)
		.then(function (data) {
			postData('/add', {data});

		}).then(function () {
			updateUI();

		}).catch(function (error) {
			console.log(`Error: ${error}`);
		})

	} else {
		alert('Zip code is not valid');
	}
});

