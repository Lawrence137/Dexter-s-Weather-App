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

  // OpenWeatherMap API. Do not share it publicly.
const api = '6cfda788a2523a0448bdaf91c4c01eae';
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.getElementById('temperature');
const tempF = document.getElementById('weather');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
