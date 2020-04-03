const formAuth = document.getElementById('form-signin');
const validationAlert = document.getElementById('validation-alert');

formAuth.addEventListener('submit', (event) => {
  let username = document.getElementById('input-username').value;
  let password = document.getElementById('input-password').value;
  validationAlert.innerHTML = '';
  if(username.length < 3) {
    console.log('Illegal username!');
    event.preventDefault();
    validationAlert.style.display = 'block';
    validationAlert.innerHTML += 'Username is too short! ';
  }
  
  if(password.length < 8) {
    console.log('Illegal password!');
    event.preventDefault();
    validationAlert.style.display = 'block';
    validationAlert.innerHTML += 'Password is too short!';
  }
  
});