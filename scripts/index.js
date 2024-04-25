
const cardTemplate = document.querySelector('#card-template').content;
const list = document.querySelector('.places__list');

function createCard(name, link, deleteCardCallback) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    card.querySelector('.card__title').textContent = name;
    card.querySelector('.card__image').src = link;
    const deleteButton = card.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        deleteCardCallback(card);
    });
    return card;
}

function deleteCard(card) {
    card.remove();
}

initialCards.forEach(function (item) {
    const card = createCard(item.name, item.link, deleteCard);
    list.appendChild(card);
});
