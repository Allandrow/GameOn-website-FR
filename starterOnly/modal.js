// Limits the scope of var declarations
(function () {
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
  const form = document.querySelector('form');

  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
  modalBtnClose.addEventListener('click', closeModal);

  // launch modal form
  function launchModal() {
    modalbg.style.display = 'block';
  }

  // FORM SUBMIT
  form.addEventListener('submit', handleSubmit);

  // close modal form
  function closeModal() {
    modalbg.style.display = 'none';
    event.stopPropagation();
  }

  // Check if input is empty
  const isInputFilled = (input) => input.length !== 0;

  // form validation on submit
  function handleSubmit(e) {
    // Form inputs values
    const firstName = document.getElementById('first').value;
    const lastName = document.getElementById('last').value;
    const email = document.getElementById('email').value;
    const birthDate = document.getElementById('birthdate').value;
    const tournamentNumber = document.getElementById('quantity').value;
    const radioLocationSelected = document.querySelector('input[name="location"]:checked');
    const conditionCheckBox = document.querySelector('#checkbox1:checked');

    e.preventDefault();
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

    if (isValidationTrue(formArray)) {
      hidesForm();

      createSuccessMessageElement();

      changesInputAttribute();

      modalBtnSubmit.addEventListener('click', closeModal);
    }
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

  // Check if radio group has a selection of if checkbox is checked
  function isInputChecked(input) {
    return input !== null;
  }

  function isValidationTrue(array) {
    // Loops through each input object and checks if it validates
    // If not, sets pass to false and adds attributes to html for error messages

    let pass = true;

    array.forEach((input, index) => {
      if (input.validation) {
        formData[index].setAttribute('data-error-visible', 'false');
      } else {
        formData[index].setAttribute('data-error-visible', 'true');
        formData[index].setAttribute('data-error', input.error);
        pass = false;
      }
    });

    return pass;
  }

  // Hides every div.formData
  function hidesForm() {
    formData.forEach((inputGroup) => {
      inputGroup.style['visibility'] = 'hidden';
    });
  }

  // Create a new element with a text that displays the success of the form submission
  function createSuccessMessageElement() {
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
})();
