document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the link from being followed
    document.querySelector('.login-container').style.display = 'block';
    document.querySelector('main').style.display = 'none';
  });

  const validCredentials = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' },
  ]
    
  
  
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  const weatherApp = document.getElementById('weather-app');
  
  loginForm.addEventListener('submit', (event) => {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();
    
  
    // Get the username and password entered by the user
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Check if the entered username and password match a valid set of credentials
    const isValidCredentials = validCredentials.some(cred => cred.username === username && cred.password === password);
  
    if (isValidCredentials) {
      // Hide the login form and display the weather app
      loginForm.style.display = 'none';
      errorMessage.style.display = 'none';
      weatherApp.style.display = 'block';
    } else {
      // Show an error message indicating that the entered username and password are invalid
      errorMessage.textContent = 'Invalid username or password';
      errorMessage.style.display = 'block';
    }
  
  });

  document.getElementById('signup-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the link from being followed
    document.querySelector('.signup-container').style.display = 'block';
    document.querySelector('main').style.display = 'none';
  });

//slideshow
  let currentSlide = 0;
  const slides = document.querySelectorAll('.feature-slide');
  
  function showSlide() {
    slides[currentSlide].style.display = 'none';
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].style.display = 'block';
  }
  
  setInterval(showSlide, 2000); // change slide every 2 seconds


const api = '6cfda788a2523a0448bdaf91c4c01eae';
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.getElementById('temperature');
const tempF = document.getElementById('weather');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

window.addEventListener('load', () => {
  let long;
  let lat;

  //Accessing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;

      document.getElementById("weather-search-form").addEventListener("submit", function(event) {
        // Prevent the form from submitting and refreshing the page
        event.preventDefault();
        // Get the location entered by the user
        const location = document.getElementById("geoLocation").value;
      
        // Call the OpenWeatherMap API to get the weather for the entered location
        const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${api}`;
        fetch(weatherApiUrl)
          .then(function(response) {
            // Check if the response was successful
            if (!response.ok) {
              throw new Error(`Error getting weather data for ${location}: ${response.status} ${response.statusText}`);
            }
            return response.json();
          })
          .then(function(weatherData) {
            const temperature = Math.round(weatherData.main.temp - 273.15);
            const weatherDescription = weatherData.weather[0].description;
      
            // Update the page to display the current temperature and weather conditions
            document.getElementById("temperature").innerHTML = temperature + "°C";
            document.getElementById("weather").innerHTML = weatherDescription;
          })
          .catch(function(error) {
            // Handle any errors that occurred
            console.error(error);
          });
      });

      // Using fetch to get data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp } = data.main;
          const place = data.name;
          const { description, icon } = data.weather[0];
          const { sunrise, sunset } = data.sys;

          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const fahrenheit = (temp * 9) / 5 + 32;

          // Converting Epoch(Unix) time to GMT
          const sunriseGMT = new Date(sunrise * 1000);
          const sunsetGMT = new Date(sunset * 1000)

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          tempC.textContent = `${temp.toFixed(2)} °C`;
          tempF.textContent = `${fahrenheit.toFixed(2)} °F`;
          sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;

          // Update background color based on weather conditions
          const body = document.querySelector('body');
          if (description.includes('clear')) {
            body.style.backgroundColor = '#f1e3cb';
          } else if (description.includes('clouds')) {
            body.style.backgroundColor = '#d3d3d3';
          } else if (description.includes('rain')) {
              body.style.backgroundColor = '#b8dcfb';
            }
        });
    });
  }
});
``
