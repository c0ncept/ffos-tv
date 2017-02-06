import {Cream} from 'cakejs2-spatial';

function resolve (desc) {
  var icon = '';
  switch (desc) {
    case 'Clear':
      icon = 'wi-day-sunny';
      break;
    case 'Clouds':
      icon = 'wi-day-cloudy';
      break;
    case 'Additional':
      icon = 'wi-cloud';
      break;
    case 'Mist':
      icon = 'wi-sprinkle';
      break;
    case 'Extreme':
      icon = 'wi-cloudy';
      break;
    case 'Drizzle':
      icon = 'wi-night-rain';
      break;
    case 'Rain':
      icon = 'wi-rain';
      break;
    case 'Thunderstorm':
      icon = 'wi-thunderstorm';
      break;
    case 'Snow':
      icon = 'wi-snow';
      break;
    case 'Atmosphere':
      icon = 'wi-windy';
      break;
    default :
      break;
  }
  return icon;
}

function getTime () {
  let today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();
  let s = today.getSeconds();
  h = pad(h);
  m = pad(m);
  s = pad(s);

  return { h, m, s };
}

function pad (i) {
  if (i < 10) { i = '0' + i; };  // add zero in front of numbers < 10
  return i;
}

const WeatherComponent = Cream.extend({
  _namespace: 'components.weather',

  init () {
    /* global fetch */
    fetch('https://freegeoip.net/json/')
      .then((resp) => resp.json())
      .then((ipdata) => {
        fetch('http://api.openweathermap.org/data/2.5/weather?q=' +
          ipdata.country_code.toLowerCase() + ',' + ipdata.city +
          '&units=imperial' + '&appid=558bdce4b8d202bebd12734ff3582c27')
          .then((resp) => resp.json())
          .then((weather) => {
            this.set('ipdata', ipdata);
            this.set('weather', weather);
          });
      });
  },

  updateTime () {
    this.set('time', getTime());
  }
});

WeatherComponent.init();

export default function Weather () {
  WeatherComponent.updateTime();

  const weather = WeatherComponent.get('weather');
  const ipdata = WeatherComponent.get('ipdata');
  const time = WeatherComponent.get('time');

  let iconCls = 'wi';

  if (weather) {
    iconCls += ' ' + resolve(weather.weather.length > 1
      ? weather.weather[1].main
      : weather.weather[0].main);
  }

  return (<div className="weather-widget">
    <div className="clock">
      { time.h } : { time.m } <span>{time.s}</span>
    </div>
    <div className={iconCls}></div>
    {ipdata &&
    <div className="info">
      <div>{Math.floor((weather.main.temp - 32) * 5 / 9)} C</div>
       <strong>{ipdata.country_name}, {ipdata.city}</strong>
    </div>
    }
  </div>);
};
