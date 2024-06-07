// index.js

import '../pages/index.css';
import '../images/logo.svg';
import '../images/avatar.jpg';
import '../images/edit-icon.svg';
import { openModal, closeModal, handleModalClick } from '../components/modal.js';
import { createCard, deleteCard } from '../components/card.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getUserInfo, getInitialCards, updateUserInfo, addCard, updateAvatar  } from '../components/api.js';


const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

const formEditProfile = document.querySelector('.popup_type_edit form');
const formNewCard = document.querySelector('.popup_type_new-card form');
const cardFormSubmitButton = formNewCard.querySelector('.popup__button');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditFormSubmitButton = formEditProfile.querySelector('.popup__button');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const cardTemplate = document.querySelector('#card-template').content;
const list = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupImageElement = popupImage.querySelector('.popup__image');
const popupCaption = popupImage.querySelector('.popup__caption');

const nameInputEditProfile = formEditProfile.querySelector('.popup__input_type_name');
const nameInputNewCard = formNewCard.querySelector('.popup__input_type_card-name');
const linkInputNewCard = formNewCard.querySelector('.popup__input_type_url');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

let currentUserId = '';

const profileImage = document.querySelector('.profile__image');
const profileAvatarContainer = document.querySelector('.profile__avatar-container');

// Находим элементы формы и кнопки
const avatarForm = document.forms['avatar-form'];
const avatarInput = avatarForm.querySelector('input[name="avatar"]');
const profileImageFormSubmitButton = avatarForm.querySelector('.popup__button');
const avatarPopup = document.querySelector('.popup_type_avatar');

const renderLoading = ({ buttonElement, isLoading }) => {
    if (isLoading) {
      buttonElement.textContent = 'Сохранение...';
    } else {
      buttonElement.textContent = 'Сохранить';
    }
  };


profileAvatarContainer.addEventListener('click', () => {
    openModal(avatarPopup);
});


// Обработка отправки формы
avatarForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const avatarUrl = avatarInput.value;

    renderLoading({
        buttonElement: profileImageFormSubmitButton,
        isLoading: true,
      });

    updateAvatar(avatarUrl)
        .then((userData) => {
            profileImage.style.backgroundImage = `url(${userData.avatar})`;
            closeModal(avatarPopup);
        })
        .catch((error) => {
            console.error(`Ошибка при обновлении аватара: ${error}`);
        })
        .finally(() => {
            renderLoading({
              buttonElement: profileImageFormSubmitButton,
              isLoading: false,
            });
        })
});

document.addEventListener('click', handleModalClick);


Promise.all([getUserInfo(), getInitialCards()])
    .then(([userInfo, cards]) => {

      currentUserId = userInfo._id;
      profileImage.style.backgroundImage = `url(${userInfo.avatar})`;

      profileTitle.textContent = userInfo.name;
      profileDescription.textContent = userInfo.about;

        cards.forEach(card => {
            const newCard = createCard(
                card.name,
                card.link,
                cardTemplate,
                openImagePopup,
                deleteCard,
                card.likes,
                card.owner._id,
                currentUserId,
                card._id
            );
            list.appendChild(newCard);
        });
    })
    .catch(error => {
        console.error(error);
    });

profileEditButton.addEventListener('click', () => {
    const tempNameValue = profileTitle.textContent;
    const tempJobValue = profileDescription.textContent;

    nameInputEditProfile.value = tempNameValue;
    jobInput.value = tempJobValue;

    openModal(popupEditProfile);
    clearValidation(formEditProfile, validationConfig);
});

popupEditProfile.addEventListener('click', event => {
    if (event.target.classList.contains('popup__close')) {
        nameInputEditProfile.value = '';
        jobInput.value = '';
    }
});
popupEditProfile.addEventListener('click', handleModalClick);
popupNewCard.addEventListener('click', handleModalClick);

formEditProfile.addEventListener('submit', evt => {
    evt.preventDefault();

    renderLoading({
        buttonElement: profileEditFormSubmitButton,
        isLoading: true,
      });

    updateUserInfo(nameInputEditProfile.value, jobInput.value)
        .then(userInfo => {
            profileTitle.textContent = userInfo.name;
            profileDescription.textContent = userInfo.about;
            closeModal(popupEditProfile);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            renderLoading({
              buttonElement: profileEditFormSubmitButton,
              isLoading: false,
            });
        })
});

profileAddButton.addEventListener('click', () => {
    openModal(popupNewCard);
    clearValidation(formNewCard, validationConfig, true);
});

formNewCard.addEventListener('submit', evt => {
    evt.preventDefault();
    const name = nameInputNewCard.value;
    const link = linkInputNewCard.value;

    renderLoading({
        buttonElement: cardFormSubmitButton,
        isLoading: true,
      });

    addCard(name, link)
        .then(card => {
            const newCard = createCard(
                card.name,
                card.link,
                cardTemplate,
                openImagePopup,
                deleteCard,
                card.likes,
                card.owner._id,
                currentUserId,
                card._id
            );
            list.prepend(newCard);
            formNewCard.reset();
            closeModal(popupNewCard);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            renderLoading({
              buttonElement: cardFormSubmitButton,
              isLoading: false,
            });
        })
});

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard(nameInputNewCard.value, linkInputNewCard.value, cardTemplate, openImagePopup, deleteCard);
    nameInputNewCard.value = '';
    linkInputNewCard.value = '';
    list.prepend(newCard);
    closeModal(popupNewCard);
}

popupImage.addEventListener('click', event => {
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
        closeModal(popupImage);
    }
});

function openImagePopup(name, link) {
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaption.textContent = name;
    openModal(popupImage);
};

enableValidation(validationConfig);


