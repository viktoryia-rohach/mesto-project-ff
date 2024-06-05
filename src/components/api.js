const CONFIG = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
    headers: {
        authorization: 'bf53f695-11e6-4a88-9021-ab4d4e7a1489',
        'Content-Type': 'application/json',
    },
};

export function getUserInfo() {
    return fetch(`${CONFIG.baseUrl}/users/me`, {
        headers: {
            authorization: CONFIG.headers.authorization
        }
    })
    .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
}

export function getInitialCards() {
    return fetch(`${CONFIG.baseUrl}/cards`, {
        headers: {
            authorization: CONFIG.headers.authorization
        }
    })
    .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
}

export function updateUserInfo(name, about) {
    return fetch(`${CONFIG.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: CONFIG.headers,
        body: JSON.stringify({ name, about })
    })
    .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
}

export function addCard(name, link) {
    return fetch(`${CONFIG.baseUrl}/cards`, {
        method: 'POST',
        headers: CONFIG.headers,
        body: JSON.stringify({ name, link })
    })
    .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
}

export function addLike(cardId) {
    return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: CONFIG.headers
    })
    .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
}

export function removeLike(cardId) {
    return fetch(`${CONFIG.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: CONFIG.headers
    })
    .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
}

export function deleteCard(cardId) {
    return fetch(`${CONFIG.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: CONFIG.headers
    })
    .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
}

export function updateAvatar(avatarUrl) {
    return fetch(`${CONFIG.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: CONFIG.headers,
        body: JSON.stringify({ avatar: avatarUrl })
    })
    .then(response => response.ok ? response.json() : Promise.reject(`Ошибка: ${response.status}`));
}
