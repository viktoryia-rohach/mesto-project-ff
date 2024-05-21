import '../pages/index.css';
import '../images/logo.svg';
import '../images/avatar.jpg';
import { openModal, closeModal, handleModalClick, handleDocumentKeydown } from '../components/modal.js';
import { initialCards } from '../scripts/cards.js';
import { createCard, deleteCard } from '../components/card.js';

const formEditProfile = document.querySelector('.popup_type_edit form');
const formNewCard = document.querySelector('.popup_type_new-card form');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupImage = document.querySelector('.popup_type_image');
const cardTemplate = document.querySelector('#card-template').content;
const list = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const popupImageElement = popupImage.querySelector('.popup__image'); // Перенесено
const popupCaption = popupImage.querySelector('.popup__caption'); // Перенесено

const nameInputEditProfile = formEditProfile.querySelector('.popup__input_type_name');
const nameInputNewCard = formNewCard.querySelector('.popup__input_type_card-name');
const linkInputNewCard = formNewCard.querySelector('.popup__input_type_url');
const jobInput = formEditProfile.querySelector('.popup__input_type_description');

let tempNameValue = '';
let tempJobValue = '';

profileEditButton.addEventListener('click', () => {
    tempNameValue = profileTitle.textContent;
    tempJobValue = profileDescription.textContent;

    nameInputEditProfile.value = tempNameValue;
    jobInput.value = tempJobValue;

    openModal(popupEditProfile);
});

popupEditProfile.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close')) {
        nameInputEditProfile.value = '';
        jobInput.value = '';
    }
});
popupEditProfile.addEventListener('click', handleModalClick);

formEditProfile.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = nameInputEditProfile.value;
    profileDescription.textContent = jobInput.value;
    closeModal(popupEditProfile);
});

popupNewCard.addEventListener('click', handleModalClick);
profileAddButton.addEventListener('click', () => openModal(popupNewCard));
formNewCard.addEventListener('submit', handleNewCardFormSubmit);

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();
    const newCard = createCard(nameInputNewCard.value, linkInputNewCard.value, cardTemplate, openImagePopup, deleteCard);
    nameInputNewCard.value = '';
    linkInputNewCard.value = '';
    list.prepend(newCard);
    closeModal(popupNewCard);
}

popupImage.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {
        closeModal(popupImage);
    }
});

initialCards.forEach((item) => {
    const card = createCard(item.name, item.link, cardTemplate, openImagePopup, deleteCard);
    list.appendChild(card);
});

function openImagePopup(name, link) {
    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaption.textContent = name;
    openModal(popupImage); 
}
