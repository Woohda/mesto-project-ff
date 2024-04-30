//Функция 

function showInputError(formElement, inputElement, errorMessage, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

function hideInputError(formElement, inputElement, config) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

function checkInputValidity(formElement, inputElement, config) {
  const regex = /^[a-zа-яё -]+$/i;
  if (!regex.test(inputElement.value) && inputElement.type === 'text') {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  };
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  };
  checkbuttonSubmitValidity(formElement, config);
};

function checkbuttonSubmitValidity(formElement, config) {
  const buttonSubmit = formElement.querySelector(config.submitButtonSelector);
  if (formElement.checkValidity()) {
    buttonSubmit.classList.remove(config.inactiveButtonClass);
    buttonSubmit.disabled = false; 
  } else {
    buttonSubmit.disabled = true;
    buttonSubmit.classList.add(config.inactiveButtonClass);
  }
}

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);
    });
  });
};

export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  inputList.forEach((inputElement) => hideInputError(formElement, inputElement, config));
  checkbuttonSubmitValidity(formElement, config);
};

export function enableValidation(config){
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function(evt){
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  })
};