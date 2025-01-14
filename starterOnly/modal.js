const nav = document.querySelector('.js-nav');
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const modalBody = document.querySelector('.modal-body');
const form = document.querySelector('form');
const formData = document.querySelectorAll('.formData');
const modalBtnClose = document.querySelector('.close');
const modalBtnSubmit = document.querySelector('.btn-submit');

function editNav() {
  var x = document.getElementById('myTopnav');
  if (x.className === 'topnav') {
    x.className += ' responsive';
  } else {
    x.className = 'topnav';
  }
}

const toggleModal = () => modalbg.classList.toggle('modal-open');

const hasMinLength = (value, length = 0) => value.length > length;

// Tests if value consists of alphabet, - or ' character
const isValidName = (value) => /^[a-z\-\']+$/i.test(value);

const isValidTextInput = (input) => (hasMinLength(input, 1) ? isValidName(input) : false);

// Tests if value consists of non-whitespace@non-whitespace.non-whitespace
const isEmail = (value) => /\S+@+\S+\.\S+/.test(value);

const isInputChecked = (value) => value !== null;

function isValid(array) {
  let areAllInputsValid = true;

  array.forEach((input, index) => {
    if (input.validation(input.value)) {
      formData[index].removeAttribute('data-error-visible');
      formData[index].removeAttribute('data-error');
      return;
    }

    formData[index].setAttribute('data-error-visible', 'true');
    formData[index].setAttribute('data-error', input.error);
    areAllInputsValid = false;
  });

  return areAllInputsValid;
}

function hideForm() {
  formData.forEach((inputGroup) => {
    inputGroup.style['visibility'] = 'hidden';
  });
}

function displaySuccessMessage() {
  const formSuccessMessage = document.createElement('p');
  formSuccessMessage.className = 'success';
  formSuccessMessage.appendChild(document.createTextNode('Merci ! Votre réservation a été reçue.'));
  modalBody.appendChild(formSuccessMessage);
}

const changeSubmitButton = () => {
  modalBtnSubmit.setAttribute('value', 'Fermer');
  modalBtnSubmit.addEventListener('click', toggleModal);
};

function handleSubmit(e) {
  e.preventDefault();

  const firstName = document.getElementById('first').value;
  const lastName = document.getElementById('last').value;
  const email = document.getElementById('email').value;
  const birthDate = document.getElementById('birthdate').value;
  const tournamentNumber = document.getElementById('quantity').value;
  const radioLocationSelected = document.querySelector('input[name="location"]:checked');
  const conditionCheckBox = document.querySelector('#checkbox1:checked');

  const formRequiredInputs = [
    {
      value: firstName,
      validation: isValidTextInput,
      error: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
    },
    {
      value: lastName,
      validation: isValidTextInput,
      error: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
    },
    {
      value: email,
      validation: isEmail,
      error: 'Veuillez saisir un email valide.',
    },
    {
      value: birthDate,
      validation: hasMinLength,
      error: 'Vous devez entrer votre date de naissance.',
    },
    {
      value: tournamentNumber,
      validation: hasMinLength,
      error: 'Veuillez remplir le champ avec un nombre',
    },
    {
      value: radioLocationSelected,
      validation: isInputChecked,
      error: 'Vous devez choisir une option',
    },
    {
      value: conditionCheckBox,
      validation: isInputChecked,
      error: 'Vous devez vérifier que vous acceptez les termes et conditions.',
    },
  ];

  if (isValid(formRequiredInputs)) {
    hideForm();

    if (modalBtnSubmit.value !== 'Fermer') {
      displaySuccessMessage();
    }

    changeSubmitButton();
  }
}

nav.addEventListener('click', editNav);

modalBtn.forEach((btn) => btn.addEventListener('click', toggleModal));
modalBtnClose.addEventListener('click', toggleModal);

form.addEventListener('submit', handleSubmit);
