/*pseudocode

-Bind an event listener to the 'login-link' element to show the login form and hide the main content.
-Define an array of valid username and password pairs.
-Get the login form and error message elements.
-Bind an event listener to the login form to handle form submissions.
-Check if the entered username and password match a valid set of credentials.
-If the entered credentials are valid, hide the login form and display the weather app.
-If the entered credentials are invalid, show an error message.
-Define a function to hide all sections except the main content.
-Bind an event listener to the 'signup-link' element to show the signup form and hide the main content.
-Set up a slideshow of feature slides, showing the next slide every 2 seconds.
-Get elements to display weather information.
-Bind an event listener to the 'search-form' element to handle form submissions.
-Get the city name entered by the user.
-Fetch weather data for the entered city from an API.
-Display the weather information on the page.*/



// Add an event listener to the login link to show the login form and hide the main content
document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the link from being followed
    // Display the login container and hide the main content
    document.querySelector('.login-container').style.display = 'block';
    document.querySelector('main').style.display = 'none';
  });

// Create an array of valid credentials
  const validCredentials = [
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' },
  ]
    
  
  // Get the login form and error message elements
  const loginForm = document.getElementById('login-form');
  const errorMessage = document.getElementById('error-message');
  const weatherApp = document.getElementById('weather-app');

  // Add an event listener to the login form to handle form submissions
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

// Define a function to hide all sections except the main content
  function hideSections() {
    document.getElementById("features").style.display = "none";
    document.getElementById("pricing").style.display = "none";
    document.getElementById("testimonials").style.display = "none";
    document.getElementById("screenshots").style.display = "none";
    document.getElementById("signup-link").style.display = "none";
  }

// Add an event listener to the signup link to show the signup form and hide the main content
  document.getElementById('signup-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the link from being followed
    document.querySelector('.signup-container').style.display = 'block';
    document.querySelector('main').style.display = 'none';
  });

// Set up a slideshow of feature slides
  let currentSlide = 0;
  const slides = document.querySelectorAll('.feature-slide');
  // Define a function to show the next slide
  function showSlide() {
    // Hide the current slide
    slides[currentSlide].style.display = 'none';
    // Increment the current slide index and reset it to 0 if it exceeds the number of slides
    currentSlide = (currentSlide + 1) % slides.length;
    // Show the next slide
    slides[currentSlide].style.display = 'block';
  }
  
  setInterval(showSlide, 2000); // change slide every 2 seconds

// Get elements to display weather information
const api = '6cfda788a2523a0448bdaf91c4c01eae';
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.getElementById('temperature');
const tempF = document.getElementById('weather');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

// Add an event listener to the window to get the user's current location when the page loads
window.addEventListener('load', () => {
  let long;
  let lat;

  //Accessing Geolocation of User
  // Check if the browser supports geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {  // Get the user's current position
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      // Construct the URL for the weather API with the user's location
      const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
     // Add an event listener to the weather search form to handle form submissions
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
