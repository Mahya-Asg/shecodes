// Feature #1
// add current date to app
function formatDate(date) {
	let hours = date.getHours();
	if (hours < 10) {
		hours = `0${hours}`;
	}
	let minutes = date.getMinutes();
	if (minutes < 10) {
		minutes = `0${minutes}`;
	}

	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[date.getDay()];
	// console.log(`${day} ${hours}:${minutes}`);

	return `${day} ${hours}:${minutes}`;
}

let dateElement = document.querySelector("#date");
// console.log(dateElement);
let today = new Date();
dateElement.innerHTML = formatDate(today);

// Feature #2
// use weather api to update searched city weather info real time

function cityWeather(response) {
	console.log(response.data);
	let temperature = Math.round(response.data.main.temp);
	// console.log(`the temprature is: ${temperature}`);

	let tempElement = document.querySelector("#temperature");
	tempElement.innerHTML = temperature;

	let weatherDescription = document.querySelector("#description");
	// console.log(response.data.weather[0].main);
	weatherDescription.innerHTML = response.data.weather[0].main;

	let humidity = document.querySelector("#humidity");
	humidity.innerHTML = response.data.main.humidity;

	let windSpeed = document.querySelector("#wind");
	windSpeedRounded = Math.round(response.data.wind.speed);
	windSpeed.innerHTML = windSpeedRounded;
}

function searchCity(event) {
	event.preventDefault();
	let cityElement = document.querySelector("#city");
	let cityInput = document.querySelector("#city-input");
	cityElement.innerHTML = cityInput.value;
	console.log(cityInput.value);
	let city = cityInput.value;
	let units = "metric";
	let url = "https://api.openweathermap.org/data/2.5/weather?q=";
	let apiKey = "63214c4281922e3bb72fdf12dada7734";
	axios.get(`${url}${city}&units=${units}&appid=${apiKey}`).then(cityWeather);
}

let searchBtn = document.querySelector("#search-btn");
searchBtn.addEventListener("click", searchCity);

// Bonus Function

function showCurrentWeather(response) {
	console.log("showCurrentWeather(response):");
	// console.log(response.data);
	// console.log(response.data.name);
	// let h1 = document.querySelector("h1");
	// let temperature = Math.round(response.data.main.temp);
	// h1.innerHTML = `It is currently ${temperature}° in ${response.data.name}`;
	let cityElement = document.querySelector("#city");
	cityElement.innerHTML = response.data.name;

	let temprature = Math.round(response.data.main.temp);
	let tempElement = document.querySelector("#temperature");
	tempElement.innerHTML = temprature;

	let weatherDescription = document.querySelector("#description");
	weatherDescription.innerHTML = response.data.weather[0].main;

	let humidity = document.querySelector("#humidity");
	humidity.innerHTML = response.data.main.humidity;

	let windSpeed = document.querySelector("#wind");
	windSpeedRounded = Math.round(response.data.wind.speed);
	windSpeed.innerHTML = windSpeedRounded;
}

function currentLocationWeather(position) {
	// console.log(position.coords.latitude);
	// console.log(position.coords.longitude);
	console.log(position);
	let latitude = position.coords.latitude;
	let longitude = position.coords.longitude;
	let apiKey = "63214c4281922e3bb72fdf12dada7734";
	let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
	// let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat={${latitude}}&lon={${longitude}}&exclude={minutely,alert}&appid={${apiKey}}`;

	axios.get(apiUrl).then(showCurrentWeather);
}

navigator.geolocation.getCurrentPosition(currentLocationWeather);

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", currentLocationWeather);
