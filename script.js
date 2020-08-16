//Current Weather

function currentWeather(response) {
  let currentTemperature = document.querySelector("#currentTemp");
  currentTemperature.innerHTML = Math.round(response.data.main.temp);
  let currentCity = document.querySelector(".currentCity");
  currentCity.innerHTML = response.data.name;
  let feelsLike = document.querySelector("#feelsLike");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector(".description");
  description.innerHTML = response.data.weather[0].description;
}

let apiKey = "91de7449ab8633be763a2c086e4ca924";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiURL).then(currentWeather);

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
