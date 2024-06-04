const showInputError = (formElement, inputElement, errorMessage, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement, config) => {
    if (!inputElement.validity.valid) {
        if (inputElement.validity.valueMissing) {
            showInputError(formElement, inputElement, inputElement.validationMessage, config);
        } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
            showInputError(formElement, inputElement, inputElement.validationMessage, config);
        } else if (inputElement.validity.patternMismatch) {
            showInputError(formElement, inputElement, inputElement.dataset.errorMessagePattern, config);
        } else if (inputElement.validity.typeMismatch && inputElement.type === 'url') {
            showInputError(formElement, inputElement, inputElement.validationMessage, config);
        } else {
            showInputError(formElement, inputElement, inputElement.validationMessage, config);
        }
    } else {
        hideInputError(formElement, inputElement, config);
    }
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};

const toggleButtonState = (inputList, buttonElement, config) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(config.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(config.inactiveButtonClass);
    }
};

const setEventListeners = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, config);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });

        inputElement.addEventListener('focus', () => {
            isValid(formElement, inputElement, config);
        });
    });

};

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, config);
    });
};

const clearValidation = (formElement, config, shouldClearValues = false) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config);
        if (shouldClearValues) {
            inputElement.value = ''; // Очищаем значение поля только если нужно
        }
    });

    toggleButtonState(inputList, buttonElement, config);
};

export { enableValidation, clearValidation };
