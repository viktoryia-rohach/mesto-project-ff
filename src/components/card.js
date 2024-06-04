import { addLike, removeLike, deleteCard as apiDeleteCard } from './api.js';

export function createCard(name, link, cardTemplate, openImagePopupCallback, deleteCardCallback, likes = [], ownerId, currentUserId, cardId) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeCounter = card.querySelector('.card__like-counter');

    cardTitle.textContent = name;
    cardImage.src = link;
    cardImage.alt = name;

    // Устанавливаем количество лайков и проверяем, был ли лайк уже поставлен текущим пользователем
    const isLikedByCurrentUser = likes.some(like => like._id === currentUserId);
    const likesCount = likes.length;
    likeCounter.textContent = likesCount;
    if (isLikedByCurrentUser) {
        likeButton.classList.add('card__like-button_is-active');
    }
    if (likesCount > 0) {
        likeCounter.classList.add('card__like-counter_is-active');
    }

    // Добавляем обработчик для лайка
    likeButton.addEventListener('click', () => handleLikeButton(cardId, likeButton, likeCounter));

    // Показываем или скрываем иконку удаления карточки в зависимости от принадлежности текущему пользователю
    if (ownerId === currentUserId) {
        deleteButton.addEventListener('click', () => handleDeleteCard(card, cardId, deleteCardCallback));
    } else {
        deleteButton.remove();
    }

    cardImage.addEventListener('click', () => openImagePopupCallback(name, link));

    return card;
}

function handleLikeButton(cardId, likeButton, likeCounter) {
    const isLiked = likeButton.classList.contains('card__like-button_is-active');
    const action = isLiked ? removeLike : addLike;

    action(cardId)
        .then(updatedCard => {
            // Обновляем состояние кнопки и счетчика лайков
            likeButton.classList.toggle('card__like-button_is-active');
            likeCounter.textContent = updatedCard.likes.length;

            // Проверяем, нужно ли добавить класс для активного счетчика лайков
            if (updatedCard.likes.length > 0) {
                likeCounter.classList.add('card__like-counter_is-active');
            } else {
                likeCounter.classList.remove('card__like-counter_is-active');
            }
        })
        .catch(error => {
            console.error(error);
        });
}

function handleDeleteCard(card, cardId, deleteCardCallback) {
    const isConfirmed = confirm('Вы уверены, что хотите удалить эту карточку?');

    if (isConfirmed) {
        apiDeleteCard(cardId)
            .then(() => {
                deleteCardCallback(card);
            })
            .catch(error => {
                console.error(`Ошибка при удалении карточки: ${error}`);
            });
    }
}

export function deleteCard(card) {
    card.remove();
}
