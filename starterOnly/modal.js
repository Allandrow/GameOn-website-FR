function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');
const modalBtnClose = document.querySelector('.close');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
modalBtnClose.addEventListener('click', closeModal);

// launch modal form
function launchModal() {
  modalbg.style.display = 'block';
}

// close modal form
function closeModal() {
  modalbg.style.display = 'none';
}

// form validation on submit
function validate() {
  // Form inputs values
  const firstName = document.getElementById('first').value;
  const lastName = document.getElementById('last').value;
  const email = document.getElementById('email').value;
  const tournamentNumber = document.getElementById('quantity').value;
  const radioLocationSelected = document.querySelector('input[name="location"]:checked');
  const conditionCheckBox = document.querySelector('#checkbox1:checked');

  // TESTS
  console.log('PRENOM VALID ? ' + isTextInputValid(firstName));
  console.log('NOM VALIDE ? ' + isTextInputValid(lastName));
  // console.log('EMAIL = ' + validTextInput(email));
  // console.log('TOURNAMENT NUMBER = ' + validNumberInput(tournamentNumber));
  // console.log('VILLE SELECTIONNEE = ' + isInputChecked(radioLocationSelected));
  // console.log('CGU VALIDEES = ' + isInputChecked(conditionCheckBox));

  // prevents form submitting
  event.preventDefault();
}

function isTextInputValid(input) {
  return hasMinLength(input) ? isAlphabetic(input) : false;
}

function hasMinLength(string) {
  return string.length > 1;
}

// True if string starts with a letter, case insensitive
function isAlphabetic(string) {
  const regex = /^[a-z]/i;
  return regex.test(string);
}

// True if email follows pattern nonWhitespace@nonWhitespace.nonWhitespace
function isEmailValid(email) {
  return /\S+@+\S+\.\S+/.test(email);
}

// Check if input is empty
function validNumberInput(input) {
  return input.length !== 0;
}

function isInputChecked(input) {
  /*
    Verifies if :
    - radio group has a selection or
    - checkbox is checked
  */
  return input !== null;
}
