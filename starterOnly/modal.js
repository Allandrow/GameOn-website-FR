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
  const radioGroupLocation = document.querySelectorAll("input[name='location']");
  const conditionCheckBox = document.getElementById('checkbox1');

  // TESTS
  console.log('TEST FIRST NAME = ' + validTextInput(firstName));
  console.log('LAST NAME = ' + validTextInput(lastName));
  console.log('EMAIL = ' + validTextInput(email));
  console.log('TOURNAMENT NUMBER = ' + validNumberInput(tournamentNumber));
  console.log('VILLE SELECTIONNEE = ' + validRadioSelected(radioGroupLocation));
  console.log('CGU VALIDEES = ' + checkboxChecked(conditionCheckBox));

  event.preventDefault();
}

// Check if input value is less than 2 characters
function validTextInput(input) {
  return input.length <= 1 ? false : true;
}

/* 
  Check if email has valid syntax :
  - any non whitepsace characters 
  - @
  - any non whitespace characters 
  - . 
  - any non whitespace characters
*/
function validEmail(email) {
  return /\S+@+\S+\.\S+/.test(email);
}

// Check if input is empty
function validNumberInput(input) {
  return input.length !== 0;
}

// Check if radio group has a selection
function validRadioSelected(group) {
  let selected = false;

  group.forEach((radio) => {
    if (radio.checked) {
      selected = true;
    }
  });

  return selected;
}

// Checkbox status
function checkboxChecked(input) {
  return input.checked;
}
