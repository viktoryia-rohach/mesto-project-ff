
export function createCard(name, link, cardTemplate, openImagePopupCallback, deleteCardCallback) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__title').textContent = name;
    const cardImage = card.querySelector('.card__image');
    cardImage.src = link;
    cardImage.alt = name;

    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');

    likeButton.addEventListener('click', handleLikeButton);
    deleteButton.addEventListener('click', () => deleteCardCallback(card));
    cardImage.addEventListener('click', () => openImagePopupCallback(name, link));

    return card;
}

function handleLikeButton(event) {
    event.target.classList.toggle('card__like-button_is-active');
}

export function deleteCard(card) {
    card.remove();
}

export function openImagePopup(name, link) {
    const popupImage = document.querySelector('.popup_type_image');
    const popupImageElement = popupImage.querySelector('.popup__image');
    const popupCaption = popupImage.querySelector('.popup__caption');

    popupImageElement.src = link;
    popupImageElement.alt = name;
    popupCaption.textContent = name;

    openModal(popupImage); 
}

import { openModal } from './modal.js';
