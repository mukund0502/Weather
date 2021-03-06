var place = document.getElementById("place");
var temperature = document.getElementById("temperature");
var icon = document.getElementById("icon");
var maushamtype = document.getElementById("maushamtype");
var humidity = document.getElementById("humidity");
var windspeed = document.getElementById("windspeed");
var btn = document.getElementById("btn");
var search = document.getElementById("searchh");
var option = document.getElementById("option");
var viewport = document.getElementById("view");
var op = document.getElementsByClassName("op");

var API = 'c43b5d7ce55249009df105521220607';

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  alert("Allow location for the realtime weather update.")
}

function showPosition(position) {
  console.log("Latitude: " + position.coords.latitude +
    "  Longitude: " + position.coords.longitude);
  fetch(`https://api.weatherapi.com/v1/current.json?key=${API}&q=${position.coords.latitude},${position.coords.longitude}&aqi=no`).then(res => res.json()).then(data => {
    console.log(data);
    value = {
      "name": data.location.name,
      "region": data.location.region,
      "country": data.location.country,
      "windspeed": data.current.wind_kph,
      "humidity": data.current.humidity,
      "temp": data.current.temp_c,
      "type": data.current.condition.text,
      "icon": data.current.condition.icon,
    };
    setpresent(value);
  })
}

function setpresent(value) {
  place.innerHTML = `${value.name}, ${value.country}`;
  windspeed.innerHTML = `Wind Speed: ${value.windspeed}km/hr`;
  humidity.innerHTML = `Humidity: ${value.humidity}%`;
  temperature.innerHTML = `${value.temp}&#176C`;
  maushamtype.innerHTML = `${value.type}`;
  icon.src = value.icon;
  if (value.type == "Sunny") {
    viewport.style.backgroundImage = "url(./sunny.jpg)";
  }
  else if (value.type.includes("cloudy")||value.type.includes("Cloudy")) {
    viewport.style.backgroundImage = "url(./cloudy.jpg)";
  }
  else if (value.type.includes("rain")||value.type.includes("Rain")) {
    viewport.style.backgroundImage = "url(./rain2.jpg)";
  }
  else {
    viewport.style.backgroundImage = "url(./aaa.jpg)";
    
  }
}
var opp = [];
btn.addEventListener("click", () => {
  ll();
})

search.addEventListener("keyup",()=>{
  setTimeout(ll,5);
})

function ll() {
  option.innerHTML = "";
  var placename = search.value;

  fetch(`https://api.weatherapi.com/v1/search.json?key=c43b5d7ce55249009df105521220607&q=${placename}`).then(res => res.json()).then(data => {
    console.log(data);
    var push = "";
    for (let index = 0; index < 7; index++) {
      push += `<div class="text-center cursor-pointer op text-xl">${data[index].name}, ${data[index].region},${data[index].country}</div> `
      option.innerHTML = push;

    }

    setTimeout(() => {
      for (let ind = 0; ind < op.length; ind++) {
        const element = op[ind];
        element.addEventListener("click", () => {
          var lat = data[ind].lat;
          var lon = data[ind].lon;
          console.log(`${data[ind].lat},${data[ind].lon}`);
          func(lat,lon,ind,element.innerHTML);

        })
      }
    }, 1000)
  })
  function func(lat,lon,ind,name) {
    fetch(`https://api.weatherapi.com/v1/current.json?key=${API}&q=${lat},${lon}&aqi=no`).then(res => res.json()).then(tata => {

      console.log(tata);

      // console.log(ind);
      // console.log(tata[ind]);

      value = { "name": tata.location.name, 
                "region": tata.location.region, 
                "country":tata.location.country, 
                "windspeed": tata.current.wind_kph, 
                "humidity": tata.current.humidity, 
                "temp": tata.current.temp_c, 
                "type": tata.current.condition.text, 
                "icon":tata.current.condition.icon,};

      setpresent(value);  
      option.innerHTML = "";
      search.value = "";
    })
  }

}
// console.log(op);
// console.log(opp.length);


