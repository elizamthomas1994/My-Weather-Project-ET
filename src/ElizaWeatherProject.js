let now = new Date();
let days = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat"
];
let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
if(minute < 10) {
    minute=`0${minute}`;
} 
let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let h4 = document.querySelector("h4");
h4.innerHTML = `${day} ${date} ${month} ${hour}:${minute}`;

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if(minutes < 10) {
    minutes =`0${minutes}`;
  } 
  return `${hours}:${minutes}`;  
}

function search(event) {
  event.preventDefault();
  let input = document.querySelector("#city-input");
  if (input.value === null) {
    alert("Your entered country was unrecognized! Please try again!");
  }
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${input.value}`;
  searchLocation(input.value);
}

function displayForecast(response) {
  let forecastElementOne = document.querySelector("#temp-one");
  let forecastFirst = response.data.list[0];
  let forecastSecond = response.data.list[1];
  let forecastThird = response.data.list[2];
  let forecastFourth = response.data.list[3];
  let forecastFifth = response.data.list[4];

  let forecastOne = response.data.list[0].main.temp_max;
  forecastElementOne.innerHTML = `${Math.round(forecastOne)}°`;
  let forecastElementTwo = document.querySelector("#temp-two");
  let forecastTwo = response.data.list[1].main.temp_max;
  forecastElementTwo.innerHTML = `${Math.round(forecastTwo)}°`;
  let forecastElementThree = document.querySelector("#temp-three");
  let forecastThree = response.data.list[2].main.temp_max;
  forecastElementThree.innerHTML = `${Math.round(forecastThree)}°`;
  let forecastElementFour = document.querySelector("#temp-four");
  let forecastFour = response.data.list[3].main.temp_max;
  forecastElementFour.innerHTML = `${Math.round(forecastFour)}°`;
  let forecastElementFive = document.querySelector("#temp-five");
  let forecastFive = response.data.list[4].main.temp_max;
  forecastElementFive.innerHTML = `${Math.round(forecastFive)}°`;

  let iconOneElement = document.querySelector("#forecast-one");
  let iconOne = forecastFirst.weather[0].icon;
  iconOneElement.setAttribute("src", `http://openweathermap.org/img/wn/${iconOne}@2x.png`);
  let iconTwoElement = document.querySelector("#forecast-two");
  let iconTwo = forecastSecond.weather[0].icon;
  iconTwoElement.setAttribute("src", `http://openweathermap.org/img/wn/${iconTwo}@2x.png`);
  let iconThreeElement = document.querySelector("#forecast-three");
  let iconThree = forecastThird.weather[0].icon;
  iconThreeElement.setAttribute("src", `http://openweathermap.org/img/wn/${iconThree}@2x.png`);
  let iconFourElement = document.querySelector("#forecast-four");
  let iconFour = forecastFourth.weather[0].icon;
  iconFourElement.setAttribute("src", `http://openweathermap.org/img/wn/${iconFour}@2x.png`);
  let iconFiveElement = document.querySelector("#forecast-five");
  let iconFive = forecastFifth.weather[0].icon;
  iconFiveElement.setAttribute("src", `http://openweathermap.org/img/wn/${iconFive}@2x.png`);

  let timeOneElement = document.querySelector("#time-one");
  timeOneElement.innerHTML = formatHours(forecastFirst.dt * 1000);
  let timeTwoElement = document.querySelector("#time-two");
  timeTwoElement.innerHTML = formatHours(forecastSecond.dt * 1000);
  let timeThreeElement = document.querySelector("#time-three");
  timeThreeElement.innerHTML = formatHours(forecastThird.dt * 1000);
  let timeFourElement = document.querySelector("#time-four");
  timeFourElement.innerHTML = formatHours(forecastFourth.dt * 1000);
  let timeFiveElement = document.querySelector("#time-five");
  timeFiveElement.innerHTML = formatHours(forecastFifth.dt * 1000);
}

function searchLocation(city) {
  let apiKey = "845420caf0be768c5c5bd5aebfc06b76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

  apiUrl =`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

function showTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector(".temp-number");
  let localCity = document.querySelector("h1");
  let iconElement = document.querySelector("#icon");
  let icon = response.data.weather[0].icon;

  localCity.innerHTML = response.data.name;
  temperatureElement.innerHTML = `${temperature}`;
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "845420caf0be768c5c5bd5aebfc06b76";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#locator");
currentLocation.addEventListener("click", getPosition);

function displayFarenheit(event) {
  event.preventDefault();
  let farenheitTemperature = Math.round((celsiusTemperature * 9/5) + 32);
  let farenheitConverter = document.querySelector(".temp-number");
  farenheitConverter.innerHTML = farenheitTemperature;
}

let farenheitLink = document.querySelector("#farenheit-link");
farenheitLink.addEventListener("click", displayFarenheit);

function displayCelsius(event) {
  event.preventDefault();
  let celsiusConverter = document.querySelector(".temp-number");
  celsiusConverter.innerHTML = celsiusTemperature;
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let celsiusTemperature = null;