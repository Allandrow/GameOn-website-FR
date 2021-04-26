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
  const birthDate = document.getElementById('birthdate').value;
  const tournamentNumber = document.getElementById('quantity').value;

  // TESTS
  console.log('FIRST NAME');
  console.log(validTextInput(firstName));
  console.log('LAST NAME');
  console.log(validTextInput(lastName));
  console.log('EMAIL');
  console.log(validEmail(email));

  event.preventDefault();
}

function validTextInput(input) {
  return (valid = input.length <= 1 ? false : true);
}

function validEmail(email) {
  return /\S+@+\S+\.\S+/.test(email);
}
