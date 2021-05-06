(function () {
  const nav = document.querySelector('.js-nav');
  const modalbg = document.querySelector('.bground');
  const modalBtn = document.querySelectorAll('.modal-btn');
  const modalBody = document.querySelector('.modal-body');
  const form = document.querySelector('form');
  const formData = document.querySelectorAll('.formData');
  const modalBtnClose = document.querySelector('.close');
  const modalBtnSubmit = document.querySelector('.btn-submit');

  function editNav() {
    console.log('hey');
    var x = document.getElementById('myTopnav');
    if (x.className === 'topnav') {
      x.className += ' responsive';
    } else {
      x.className = 'topnav';
    }
  }

  const toggleModal = () => modalbg.classList.toggle('modal-open');

  const hasMinLength = (value, length = 0) => value.length > length;

  const isAlphabetic = (value) => /^[a-z]/i.test(value);

  const isTextInputValid = (input) => (hasMinLength(input, 1) ? isAlphabetic(input) : false);

  const isEmail = (value) => /\S+@+\S+\.\S+/.test(value);

  const isInputChecked = (value) => value !== null;

  function isValidationTrue(array) {
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

  function hidesForm() {
    formData.forEach((inputGroup) => {
      inputGroup.style['visibility'] = 'hidden';
    });
  }

  function createSuccessMessageElement() {
    const formSuccessMessage = document.createElement('div');
    formSuccessMessage.style.textAlign = 'center';
    formSuccessMessage.innerHTML = `
        <p style="position:absolute;top:50%;">Merci ! Votre réservation a été reçue.</p>
      `;
    modalBody.appendChild(formSuccessMessage);
  }

  const changesInputAttribute = () => modalBtnSubmit.setAttribute('value', 'Fermer');

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

    if (isValidationTrue(formRequiredInputs)) {
      hidesForm();

      createSuccessMessageElement();

      changesInputAttribute();

      modalBtnSubmit.addEventListener('click', toggleModal);
    }
  }

  function loadEventListeners() {
    nav.addEventListener('click', editNav);

    modalBtn.forEach((btn) => btn.addEventListener('click', toggleModal));
    modalBtnClose.addEventListener('click', toggleModal);

    form.addEventListener('submit', handleSubmit);
  }

  loadEventListeners();
})();
