document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the link from being followed
    document.querySelector('.login-container').style.display = 'block';
    document.querySelector('main').style.display = 'none';
  });

  // OpenWeatherMap API. Do not share it publicly.
const api = '6cfda788a2523a0448bdaf91c4c01eae';
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.getElementById('temperature');
const tempF = document.getElementById('weather');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
