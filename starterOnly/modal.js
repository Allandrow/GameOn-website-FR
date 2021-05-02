// Limits the scope of var declarations
(function () {
  function editNav() {
    console.log('hey');
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }

  /*
    DOM Elements  
  */
  const nav = document.querySelector('.js-nav');
  const modalbg = document.querySelector('.bground');
  const modalBtn = document.querySelectorAll('.modal-btn');
  const modalBody = document.querySelector('.modal-body');
  const form = document.querySelector('form');
  const formData = document.querySelectorAll('.formData');
  const modalBtnClose = document.querySelector('.close');
  const modalBtnSubmit = document.querySelector('.btn-submit');

  /*
    Toggle modal display  
  */
  const toggleModal = () => modalbg.classList.toggle('modal-open');

  /*
    True if value has at least a length of 2  
  */
  const hasMinLength = (value) => value.length > 1;

  /*
    True if value starts with a letter, case insensitive
  */
  const isAlphabetic = (value) => /^[a-z]/i.test(value);

  /*
    Returns false if hasMinLength is false, otherwise returns the result of isAlphabetic
  */
  const isTextInputValid = (input) => (hasMinLength(input) ? isAlphabetic(input) : false);

  /*
    Check if value is empty
  */
  const isInputFilled = (value) => value.length !== 0;

  /*
    True if value follows pattern nonWhitespace@nonWhitespace.nonWhitespace
  */
  const isEmail = (value) => /\S+@+\S+\.\S+/.test(value);

  /*
    Check if radio group has a selection or if checkbox is checked
  */
  const isInputChecked = (value) => value !== null;

  /*
    Hides every div.formData
  */
  function hidesForm() {
    formData.forEach((inputGroup) => {
      inputGroup.style['visibility'] = 'hidden';
    });
  }

  /*
    Changes the value of the input to 'Fermer'
  */
  const changesInputAttribute = () => modalBtnSubmit.setAttribute('value', 'Fermer');

  /*
    form validation on submit
  */
  function handleSubmit(e) {
    // Form inputs values
    const firstName = document.getElementById('first').value;
    const lastName = document.getElementById('last').value;
    const email = document.getElementById('email').value;
    const birthDate = document.getElementById('birthdate').value;
    const tournamentNumber = document.getElementById('quantity').value;
    const radioLocationSelected = document.querySelector('input[name="location"]:checked');
    const conditionCheckBox = document.querySelector('#checkbox1:checked');

    /*  
      Stores required inputs :
      - element if radio/checkbox checked, or null
      - value if another input type
      - result of validation function
      - data-error message
    */
    const formRequiredInputs = [
      {
        value: firstName,
        validation: isTextInputValid,
        error: 'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
      },
      {
        value: lastName,
        validation: isTextInputValid,
        error: 'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
      },
      {
        value: email,
        validation: isEmail,
        error: 'Veuillez saisir un email valide.',
      },
      {
        value: birthDate,
        validation: isInputFilled,
        error: 'Vous devez entrer votre date de naissance.',
      },
      {
        value: tournamentNumber,
        validation: isInputFilled,
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

    e.preventDefault();

    if (isValidationTrue(formRequiredInputs)) {
      hidesForm();

      createSuccessMessageElement();

      changesInputAttribute();

      modalBtnSubmit.addEventListener('click', toggleModal);
    }
  }

  /* 
    Loops through each input object and checks if it validates
    If not, sets pass to false and adds attributes to html for error messages
  */
  function isValidationTrue(array) {
    let isValid = true;

    array.forEach((input, index) => {
      if (input.validation(input.value)) {
        formData[index].setAttribute('data-error-visible', 'false');
      } else {
        formData[index].setAttribute('data-error-visible', 'true');
        formData[index].setAttribute('data-error', input.error);
        isValid = false;
      }
    });

    return isValid;
  }

  /*
    Create a new element with a text that displays the success of the form submission
  */
  function createSuccessMessageElement() {
    const formSuccessMessage = document.createElement('div');
    formSuccessMessage.style.textAlign = 'center';
    formSuccessMessage.innerHTML = `
      <p style="position:absolute;top:50%;">Merci ! Votre réservation a été reçue.</p>
    `;
    modalBody.appendChild(formSuccessMessage);
  }

  /*
    Contains all event listeners
   */
  function loadEventListeners() {
    // Display nav
    nav.addEventListener('click', editNav);

    // Modal display toggling
    modalBtn.forEach((btn) => btn.addEventListener('click', toggleModal));
    modalBtnClose.addEventListener('click', toggleModal);

    // Form submission
    form.addEventListener('submit', handleSubmit);
  }

  loadEventListeners();
})();
