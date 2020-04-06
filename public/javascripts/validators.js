"use strict";

const formAuth = document.getElementById('form-auth')
const validationAlert = document.getElementById('validation-alert')
const validationError = document.getElementById('validation-error')
const inputUsername = document.getElementById('input-username')
const inputPassword = document.getElementById('input-password')
const inputPasswordMatch = document.getElementById('input-password-match')

formAuth.addEventListener('submit', (event) => {
  let preventDefault = false

  validationAlert.style.display = 'none'
  validationError ? (validationError.style.display = 'none') : null
  validationAlert.innerHTML = ''

  if (inputUsername.value.length < 3) {
    preventDefault = true
    validationAlert.style.display = 'block'
    validationAlert.innerHTML += 'Username is too short! '
  }

  if (inputPassword.value.length < 8) {
    preventDefault = true
    validationAlert.style.display = 'block'
    validationAlert.innerHTML += 'Password is too short!'
  }

  if (inputPasswordMatch && inputPassword.value !== inputPasswordMatch.value) {
    preventDefault = true
    validationAlert.style.display = 'block'
    validationAlert.innerHTML += `Passwords don't match!`
  }

  preventDefault ? event.preventDefault() : null
})
