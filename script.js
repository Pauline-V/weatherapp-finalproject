//Current Date

function today(data) {
  let today = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
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
    "December",
  ];
  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let day = days[today.getDay()];
  let time = hours + `:` + minutes;
  let month = months[today.getMonth()];
  let date = today.getDate();

  return `${day}, ${date} ${month} ${time}`;
}

let currentDate = document.querySelector(".currentDate");
currentDate.innerHTML = today();

//Current Weather

function currentWeather(response) {
  let currentTemperature = document.querySelector("#currentTemp");
  let currentCity = document.querySelector(".currentCity");
  let feelsLike = document.querySelector("#feelsLike");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let description = document.querySelector(".description");
  let currentEmoji = document.querySelector("#currentEmoji");

  celsiusTemp = Math.round(response.data.main.temp);

  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  currentCity.innerHTML = response.data.name;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  humidity.innerHTML = Math.round(response.data.main.humidity);
  wind.innerHTML = Math.round(response.data.wind.speed);
  description.innerHTML = response.data.weather[0].description;
  currentEmoji.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let apiKey = `91de7449ab8633be763a2c086e4ca924`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiURL).then(currentWeather);
}

function submit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#inputCity");
  searchCity(cityInput.value);
}

let form = document.querySelector("#searchCity");
form.addEventListener("submit", submit);

searchCity("London");

//current Position button
function currentPosition(position) {
  let apiKey = "91de7449ab8633be763a2c086e4ca924";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(currentWeather);
}

function getLoc() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let button = document.querySelector("#changetoCurrentLoc");
button.addEventListener("click", getLoc);

//conversion to Fahrenheit

function changeTemptoFahr(event) {
  event.preventDefault();
  let tempFahr = (celsiusTemp * 9) / 5 + 32;
  linktoCelsius.classList.remove("active");
  linktoFahr.classList.add("active");
  let currentTemperature = document.querySelector("#currentTemp");
  currentTemperature.innerHTML = Math.round(tempFahr);
}

let linktoFahr = document.querySelector("#changeToFahr");
linktoFahr.addEventListener("click", changeTemptoFahr);

let celsiusTemp = null;

function changeTemptoCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#currentTemp");
  linktoFahr.classList.remove("active");
  linktoCelsius.classList.add("active");
  currentTemperature.innerHTML = celsiusTemp;
}

let linktoCelsius = document.querySelector("#changeToCelsius");
linktoCelsius.addEventListener("click", changeTemptoCelsius);
