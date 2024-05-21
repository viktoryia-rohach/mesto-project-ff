export { handleDocumentKeydown, openModal, closeModal, handleModalClick };

const handleDocumentKeydown = (event) => {
    if (event.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
};

const openModal = (element) => {
    element.classList.add('popup_is-opened');
    element.classList.add('popup_is-animated');
    document.addEventListener('keydown', handleDocumentKeydown);
};

const closeModal = (element) => {
    document.removeEventListener('keydown', handleDocumentKeydown);
    element.classList.remove('popup_is-opened');
};

const handleModalClick = (event) => {
    if (event.target.classList.contains('popup_is-opened')) {
        return closeModal(event.target);
    }

    if (event.target.closest('.popup__close')) {
        return closeModal(event.target.closest('.popup'));
    }
}

