import '../pages/index.css';
import '../images/logo.svg';
import '../images/avatar.jpg';
import { openModal, closeModal, handleModalClick, handleDocumentKeydown } from '../components/modal.js';
import { initialCards } from '../scripts/cards.js';
import { createCard, deleteCard, openImagePopup } from '../components/card.js';

const formEditProfile = document.querySelector('.popup_type_edit form');
const formNewCard = document.querySelector('.popup_type_new-card form');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const cardTemplate = document.querySelector('#card-template').content;
const list = document.querySelector('.places__list');

const nameInput = formEditProfile.querySelector('.popup__input_type_name');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

let tempNameValue = '';
let tempJobValue = '';

profileEditButton.addEventListener('click', () => {
    tempNameValue = document.querySelector('.profile__title').textContent;
    tempJobValue = document.querySelector('.profile__description').textContent;

    nameInput.value = tempNameValue;
    jobInput.value = tempJobValue;

    openModal(popupEditProfile);
});

popupEditProfile.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close')) {
        nameInput.value = '';
        jobInput.value = '';
    }
});
popupEditProfile.addEventListener('click', handleModalClick);

formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent = nameInput.value;
    document.querySelector('.profile__description').textContent = jobInput.value;
    closeModal(popupEditProfile);
});

popupNewCard.addEventListener('click', handleModalClick);
profileAddButton.addEventListener('click', () => openModal(popupNewCard));
formNewCard.addEventListener('submit', handleNewCardFormSubmit);

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const nameInput = formNewCard.querySelector('.popup__input_type_card-name');
    const linkInput = formNewCard.querySelector('.popup__input_type_url');
    const newCard = createCard(nameInput.value, linkInput.value, cardTemplate, openImagePopup, deleteCard);
    nameInput.value = '';
    linkInput.value = '';
    list.prepend(newCard);
    closeModal(popupNewCard);
}

document.addEventListener('keydown', handleDocumentKeydown);

popupImage.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
        closeModal(popupImage);
    }
});

initialCards.forEach((item) => {
    const card = createCard(item.name, item.link, cardTemplate, openImagePopup, deleteCard);
    list.appendChild(card);
});
