let dateTime = new Date();

let options = {
  month: 'long',
  day: 'numeric',
  weekday: 'short',
  hour: 'numeric',
  minute: 'numeric',
};

let day = {
  0: 'sunday',
  1: 'monday',
  2: 'thuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

let logoOneDay = document.getElementById('logoOneDay');
let logoTwoDay = document.getElementById('logoTwoDay');
let logoThreeDay = document.getElementById('logoThreeDay');
let degOne = document.getElementById('degOne');
let degTwo = document.getElementById('degTwo');
let degThree = document.getElementById('degThree');
let dayOne = document.getElementById('dayone');
let dayTwo = document.getElementById('daytwo');
let dayThree = document.getElementById('daythree');
let locationUser = document.getElementById('country');
let todayLogo = document.getElementById('weatherLogo');
let degreesToday = document.getElementById('degreesTo');
let condition = document.getElementById('condition');
let feelsLike = document.getElementById('feelsLike');
let wind = document.getElementById('wind');
let humidityTown = document.getElementById('humidity');
let date = document.getElementById('dateTime');
let positionLongitude = document.getElementById('longitude');
let positionLatitude = document.getElementById('latitude');
let mapHtml = document.getElementById('map');
let locationBlock = document.getElementById('location');
let refreshBtn = document.getElementById('refreshBtn');
let cel = document.getElementById('celsius');
let far = document.getElementById('fahrenheit');

date.textContent = dateTime.toLocaleString('en-GB', options);

async function setBackgroundImage() {
  let link;
  const url = `https://api.unsplash.com/photos/random?query=town,Ufa&client_id=472c15d3b911a4f0c95fa146c48b2b7a5298d38afe5f7fd474e6b6a67e54df21`;
  try {
    let response = await fetch(url);
    let json = await response.json();
    link = await json.urls.small;
  } catch (err) {
    return err;
  }
  locationBlock.style.background = `linear-gradient(#5f4e9680, #95537b80), url(${link}) no-repeat`;
  locationBlock.style.backgroundSize = '100% 100%';
}

function activeBtn() {
  this.classList.add('active');
  if (this == cel) {
    far.classList.remove('active');
  } else {
    cel.classList.remove('active');
  }
}

function celsius(temperature) {
  return Math.floor(((temperature - 32) * 5) / 9);
}

setTimeout(function set() {
  dateTime = new Date();
  date.textContent = dateTime.toLocaleString('en-GB', options);
  setTimeout(set, 60001);
}, 60001);

mapboxgl.accessToken =
  'pk.eyJ1IjoidXdldHUiLCJhIjoiY2s0Mmk3bGFqMDBsajNsczMydHViYnlydyJ9.1IY_Osu-DEAo1vXwwLhJ-w';
let map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  center: [-79.4512, 43.6568],
  zoom: 13,
});

let geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  mapboxgl: mapboxgl,
});

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(pos => {
    let crd = pos.coords;
    map.flyTo({
      center: [crd.longitude, crd.latitude],
    });
    positionLatitude.textContent = 'Latitude: ' + crd.latitude.toFixed(3);
    positionLongitude.textContent = 'Longitude: ' + crd.longitude.toFixed(3);
    let proxy = 'https://cors-anywhere.herokuapp.com/';
    let api = `${proxy}https://api.darksky.net/forecast/8811bed434bc45bdad5131edb4f26174/${crd.latitude},${crd.longitude}`;
    fetch(api)
      .then(response => {
        return response.json();
      })
      .then(data => {
        const {
          windSpeed,
          humidity,
          apparentTemperature,
          temperature,
          summary,
          icon,
        } = data.currently;
        degreesToday.textContent = celsius(temperature) + '°';
        condition.textContent = summary;
        feelsLike.textContent = 'FEELS LIKE: ' + celsius(apparentTemperature) + '°';
        wind.textContent = 'WIND: ' + windSpeed + ' m/s';
        humidityTown.textContent = 'HUMIDITY: ' + humidity * 100 + '%';
        todayLogo.src = `./assets/img/weather/${icon}.svg`;
        degOne.textContent =
          Math.floor(
            (celsius(data.daily.data[0].temperatureHigh) -
              Math.abs(celsius(data.daily.data[0].temperatureLow))) /
              2,
          ) + '°';
        degTwo.textContent =
          Math.floor(
            (celsius(data.daily.data[1].temperatureHigh) -
              Math.abs(celsius(data.daily.data[1].temperatureLow))) /
              2,
          ) + '°';
        degThree.textContent =
          Math.floor(
            (celsius(data.daily.data[2].temperatureHigh) -
              Math.abs(celsius(data.daily.data[2].temperatureLow))) /
              2,
          ) + '°';
        logoOneDay.src = `./assets/img/weather/${data.daily.data[0].icon}.svg`;
        logoTwoDay.src = `./assets/img/weather/${data.daily.data[1].icon}.svg`;
        logoThreeDay.src = `./assets/img/weather/${data.daily.data[2].icon}.svg`;
      });
    let url = 'https://ipinfo.io/json?token=e350ee42cac6a6';
    fetch(url)
      .then(res => {
        return res.json();
      })
      .then(data => {
        locationUser.textContent = data.city + ', ' + data.country;
      });
  });
}

window.onload = () => {
  setBackgroundImage();
};

refreshBtn.addEventListener('click', setBackgroundImage);
cel.addEventListener('click', activeBtn);
far.addEventListener('click', activeBtn);
document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

dayOne.textContent = day[(dateTime.getDay() + 1) % 7];
dayTwo.textContent = day[(dateTime.getDay() + 2) % 7];
dayThree.textContent = day[(dateTime.getDay() + 3) % 7];
