// Функция создания карточки
export function createCard(name, link, cardTemplate, openImagePopupCallback, deleteCardCallback) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

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
