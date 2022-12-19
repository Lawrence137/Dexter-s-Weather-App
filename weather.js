document.getElementById('login-link').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the link from being followed
    document.querySelector('.login-container').style.display = 'block';
    document.querySelector('main').style.display = 'none';
  });

 