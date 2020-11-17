let date = new Date();
let currentDate = date.getDate();
let day = date.getDay();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let hour = date.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let timezone = date.getTimezoneOffset();
let currentDay = days[date.getDay()];
let today = document.querySelector("#current-day");

let time = document.querySelector("#current-time");
let iconElement = document.querySelector("#icon");

today.innerHTML = `${days[date.getDay()]}`;
time.innerHTML = `${hour}:${minutes}`;

function displayWeather(response) {
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = `${Math.round(
    response.data.main.temp
  )} `;
  document.querySelector(
    "#terms"
  ).innerHTML = `${response.data.weather[0].description}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
}

function displayCity(city) {
  let apiKey = "2218cbec7053bede118ce009e695cac4";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayWeather);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-name-input").value;
  displayCity(city);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", changeCity);

function currentPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "2218cbec7053bede118ce009e695cac4";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(`${url}`).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getCurrentPosition);

displayCity("New York");
