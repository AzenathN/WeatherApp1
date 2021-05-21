/*let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  moscow: {
    temp: -5,
    humidity: 20
  }
};
let city = prompt("Enter your city here");
city = city.trim(" ");
city = city.toLocaleLowerCase();
if (weather[city] !== undefined) {
  let temp = weather[city].temp;
  let humidity = weather[city].humidity;
  let ctemp = Math.round(temp);
  let ftemp = Math.round(ctemp * 1.8 + 32);

  alert(
    `It is currently ${ctemp}°C(${ftemp}°F) in ${city} with a humidity of ${humidity}%`
  );
} else {
  alert(
    `Sorry, we don't know the weather for this city, try going to http://www.google.com/search?q=weather ${city}`
  );
}//*/

//homework wk 4// feature#1
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let day = days[now.getDay()];
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
console.log(now);

let h3 = document.querySelector("h3");
h3.innerHTML = `${day}<br>${month} ${date},${year}<br>${hour}:${minute}`;

//*feature#2//
function convertCelsiusLink(event) {
  event.preventDefault();
  let celsiusTemp = document.querySelector("#temperature-today");
  let currentTemp = document.querySelector("#temperature-today");
  let tempConversion = currentTemp.innerHTML;
  celsiusTemp.innerHTML = `${Math.round(((tempConversion - 32) * 5) / 9)}°C`;
}
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsiusLink);

function getTemperatureConditionsF(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let fahrenheitTemp = document.querySelector("#temperature-today");

  document.querySelector("#searchedCity").innerHTML = response.data.name;
  fahrenheitTemp.innerHTML = currentTemp;
}
function search(cityName) {
  let units = "metric";
  let apiKey = "d72a05c8cd750bbf5b0d42daadb7570b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemperatureConditionsF);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input").value;
  search(cityName);
}
let searchFormButton = document.querySelector("#search-bar");
searchFormButton.addEventListener("submit", handleSubmit);

function retrieveWeatherCoordination(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let units = "metric";
  let apiKey = "d72a05c8cd750bbf5b0d42daadb7570b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemperatureConditionsF);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrieveWeatherCoordination);
  console.log(event);
}
let currentLocationbutton = document.querySelector("#current-location");
currentLocationbutton.addEventListener("click", currentLocation);

function showCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#units");
  currentTemperature.innerHTML = "11";
}
let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", showCelsius);

function showFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature-today");
  currentTemperature.innerHTML = Math.round((11 * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", showFahrenheit);

search("Riverside");
