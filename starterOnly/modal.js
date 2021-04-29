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
const modalBody = document.querySelector('.modal-body');
const formData = document.querySelectorAll('.formData');
const modalBtnClose = document.querySelector('.close');
const modalBtnSubmit = document.querySelector('.btn-submit');

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
  const radioLocationSelected = document.querySelector('input[name="location"]:checked');
  const conditionCheckBox = document.querySelector('#checkbox1:checked');

  let validationsPassed = true;

  // Stores required inputs :
  // - element if radio/checkbox checked, or null
  // - value if another input type
  // - result of validation function
  // - data-error message
  const formArray = [
    {
      id: 0,
      value: firstName,
      validation: isTextInputValid(firstName),
      error: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
    },
    {
      id: 1,
      value: lastName,
      validation: isTextInputValid(lastName),
      error: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
    },
    {
      id: 2,
      value: email,
      validation: isEmailValid(email),
      error: 'Veuillez saisir un email valide.',
    },
    {
      id: 3,
      value: birthDate,
      validation: isInputFilled(birthDate),
      error: 'Vous devez entrer votre date de naissance.',
    },
    {
      id: 4,
      value: tournamentNumber,
      validation: isInputFilled(tournamentNumber),
      error: 'Veuillez remplir le champ avec un nombre',
    },
    {
      id: 5,
      value: radioLocationSelected,
      validation: isInputChecked(radioLocationSelected),
      error: 'Vous devez choisir une option',
    },
    {
      id: 6,
      value: conditionCheckBox,
      validation: isInputChecked(conditionCheckBox),
      error: 'Vous devez vérifier que vous acceptez les termes et conditions.',
    },
  ];

  formArray.forEach((input) => {
    if (input.validation) {
      formData[input.id].setAttribute('data-error-visible', 'false');
    } else {
      validationsPassed = false;
      formData[input.id].setAttribute('data-error-visible', 'true');
      formData[input.id].setAttribute('data-error', input.error);
    }
  });

  if (validationsPassed) {
    formData.forEach((group) => {
      group.style['visibility'] = 'hidden';
    });
    const formSuccessMessage = document.createElement('div');
    formSuccessMessage.style.textAlign = 'center';
    formSuccessMessage.innerHTML = `
      <p style="position:absolute;top:50%;">Merci ! Votre réservation a été reçue.</p>
    `;
    modalBody.appendChild(formSuccessMessage);
    modalBtnSubmit.setAttribute('value', 'Fermer');

    modalBtnSubmit.addEventListener('click', closeModal);
  }

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
function isInputFilled(input) {
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
