// const { data } = require("autoprefixer");

var place = document.getElementById("place");
var temperature = document.getElementById("temperature");
var icon = document.getElementById("icon");
var maushamtype = document.getElementById("maushamtype");
var humidity = document.getElementById("humidity");
var windspeed = document.getElementById("windspeed");
var btn = document.getElementById("btn");
var search = document.getElementById("searchh");

var API = 'c43b5d7ce55249009df105521220607';

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  console.log("Geolocation is not supported by this browser.");
}
function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude +
    "  Longitude: " + position.coords.longitude);
  fetch(`https://api.weatherapi.com/v1/current.json?key=${API}&q=22.3,44.2&aqi=no`).then(res => res.json()).then(data => {
    console.log(data);
    value = { "name": data.location.name, "region": data.location.region,  "country": data.location.country, "windspeed": data.current.wind_kph, "humidity": data.current.humidity, "temp": data.current.temp_c, "type": data.current.condition.text, "icon":data.current.condition.icon,};

    setpresent(value);
  })
}

function setpresent(value) {
  place.innerHTML = `${value.name}, ${value.region}`;
  windspeed.innerHTML = `Wind Speed: ${value.windspeed}km/hr`;
  humidity.innerHTML = `Humidity: ${value.humidity}%`;
  temperature.innerHTML = `${value.temp}&#176C`;
  maushamtype.innerHTML = `${value.type}`;
  icon.src = value.icon;
}

btn.addEventListener("click", () => {
  var placename = search.value;
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=c43b5d7ce55249009df105521220607&q=${placename}&aqi=no&alerts=no`).then(res => res.json()).then(data => {
    console.log(data);
    value = { "name": data.location.name, "region": data.location.region, "country":data.location.country, "windspeed": data.current.wind_kph, "humidity": data.current.humidity, "temp": data.current.temp_c, "type": data.current.condition.text, "icon":data.current.condition.icon,};

    setpresent(value);
  })
})

