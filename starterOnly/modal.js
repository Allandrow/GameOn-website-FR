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
  event.stopPropagation();
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

  // Stores required inputs :
  // - element if radio/checkbox checked, or null
  // - value if another input type
  // - result of validation function
  // - data-error message
  const formArray = [
    {
      value: firstName,
      validation: isTextInputValid(firstName),
      error: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
    },
    {
      value: lastName,
      validation: isTextInputValid(lastName),
      error: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
    },
    {
      value: email,
      validation: isEmailValid(email),
      error: 'Veuillez saisir un email valide.',
    },
    {
      value: birthDate,
      validation: isInputFilled(birthDate),
      error: 'Vous devez entrer votre date de naissance.',
    },
    {
      value: tournamentNumber,
      validation: isInputFilled(tournamentNumber),
      error: 'Veuillez remplir le champ avec un nombre',
    },
    {
      value: radioLocationSelected,
      validation: isInputChecked(radioLocationSelected),
      error: 'Vous devez choisir une option',
    },
    {
      value: conditionCheckBox,
      validation: isInputChecked(conditionCheckBox),
      error: 'Vous devez vérifier que vous acceptez les termes et conditions.',
    },
  ];

  // changes to false during the loop through formArray, if it stays true then it hides the form to display success message
  let validationsPassed = true;

  // Loops through each input object and checks if it validates
  // If not, sets validationsPassed to false and adds attributes to html for error messages
  formArray.forEach((input, index) => {
    if (input.validation) {
      formData[index].setAttribute('data-error-visible', 'false');
    } else {
      validationsPassed = false;
      formData[index].setAttribute('data-error-visible', 'true');
      formData[index].setAttribute('data-error', input.error);
    }
  });

  if (validationsPassed) {
    hidesForm();

    createSuccessMessage();

    changesInputAttribute();

    modalBtnSubmit.addEventListener('click', closeModal);
  }

  event.preventDefault();
}

// Returns false if hasMinLength is false, otherwise returns the result of isAlphabetic
function isTextInputValid(input) {
  return hasMinLength(input) ? isAlphabetic(input) : false;
}

// True if string has at least a length of 2
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

// Check if radio group has a selection of if checkbox is checked
function isInputChecked(input) {
  return input !== null;
}

// Hides every div.formData
function hidesForm() {
  formData.forEach((inputGroup) => {
    inputGroup.style['visibility'] = 'hidden';
  });
}

// Create a new element with a text that displays the success of the form submission
function createSuccessMessage() {
  const formSuccessMessage = document.createElement('div');
  formSuccessMessage.style.textAlign = 'center';
  formSuccessMessage.innerHTML = `
    <p style="position:absolute;top:50%;">Merci ! Votre réservation a été reçue.</p>
  `;
  modalBody.appendChild(formSuccessMessage);
}

// Changes the value of the input to 'Fermer'
function changesInputAttribute() {
  modalBtnSubmit.setAttribute('value', 'Fermer');
}
