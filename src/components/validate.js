import {
    formSelectors
} from "./constants";

// Валидация форм
function showInputError(formElement, inputElement, errorMessage, formSelectors) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = errorMessage;
    inputElement.classList.add(`${formSelectors.inputErrorClass}`);
    errorElement.classList.add(`${formSelectors.errorClass}`);
}

function hideInputError(formElement, inputElement, formSelectors) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

    errorElement.textContent = '';
    inputElement.classList.remove(`${formSelectors.inputErrorClass}`);
    errorElement.classList.remove(`${formSelectors.errorClass}`);
}

function isValid(formElement, inputElement) {
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, formSelectors);
    } else {
        hideInputError(formElement, inputElement, formSelectors);
    }
}

function setEventListeners(formElement, formSelectors) {
    const inputList = Array.from(formElement.querySelectorAll(`.${formSelectors.inputSelector}`));
    const buttonElement = formElement.querySelector(`.${formSelectors.submitButtonSelector}`);
    toggleButtonState(inputList, buttonElement, formSelectors);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            toggleButtonState(inputList, buttonElement, formSelectors);
            isValid(formElement, inputElement);
        })
    })
}

function enableValidation(formSelectors) {
    const formList = Array.from(document.querySelectorAll(`.${formSelectors.formSelector}`));

    formList.forEach((formElement) => {
        setEventListeners(formElement, formSelectors);
    })
}

function hasInvalidInput(inputList) {
    return inputList.some(inputElement => {
        return !inputElement.validity.valid;
    })
}

function toggleButtonState(inputList, buttonElement, formSelectors) {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(`${formSelectors.inactiveButtonClass}`);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(`${formSelectors.inactiveButtonClass}`);
    }
}

function checkEmptyFields(formElement, inputElement) {
    if (inputElement.value == '') {
        hideInputError(formElement, inputElement, formSelectors);
    }
}

export {
    formSelectors,
    enableValidation,
    checkEmptyFields
};