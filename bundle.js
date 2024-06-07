/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/api.js":
/*!*******************************!*\
  !*** ./src/components/api.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addCard: () => (/* binding */ addCard),\n/* harmony export */   addLike: () => (/* binding */ addLike),\n/* harmony export */   deleteCard: () => (/* binding */ deleteCard),\n/* harmony export */   getInitialCards: () => (/* binding */ getInitialCards),\n/* harmony export */   getUserInfo: () => (/* binding */ getUserInfo),\n/* harmony export */   removeLike: () => (/* binding */ removeLike),\n/* harmony export */   updateAvatar: () => (/* binding */ updateAvatar),\n/* harmony export */   updateUserInfo: () => (/* binding */ updateUserInfo)\n/* harmony export */ });\nvar CONFIG = {\n  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',\n  headers: {\n    authorization: 'bf53f695-11e6-4a88-9021-ab4d4e7a1489',\n    'Content-Type': 'application/json'\n  }\n};\nfunction handleResponse(response) {\n  return response.ok ? response.json() : Promise.reject(\"\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430: \".concat(response.status));\n}\nfunction getUserInfo() {\n  return fetch(\"\".concat(CONFIG.baseUrl, \"/users/me\"), {\n    headers: {\n      authorization: CONFIG.headers.authorization\n    }\n  }).then(handleResponse);\n}\nfunction getInitialCards() {\n  return fetch(\"\".concat(CONFIG.baseUrl, \"/cards\"), {\n    headers: {\n      authorization: CONFIG.headers.authorization\n    }\n  }).then(handleResponse);\n}\nfunction updateUserInfo(name, about) {\n  return fetch(\"\".concat(CONFIG.baseUrl, \"/users/me\"), {\n    method: 'PATCH',\n    headers: CONFIG.headers,\n    body: JSON.stringify({\n      name: name,\n      about: about\n    })\n  }).then(handleResponse);\n}\nfunction addCard(name, link) {\n  return fetch(\"\".concat(CONFIG.baseUrl, \"/cards\"), {\n    method: 'POST',\n    headers: CONFIG.headers,\n    body: JSON.stringify({\n      name: name,\n      link: link\n    })\n  }).then(handleResponse);\n}\nfunction addLike(cardId) {\n  return fetch(\"\".concat(CONFIG.baseUrl, \"/cards/likes/\").concat(cardId), {\n    method: 'PUT',\n    headers: CONFIG.headers\n  }).then(handleResponse);\n}\nfunction removeLike(cardId) {\n  return fetch(\"\".concat(CONFIG.baseUrl, \"/cards/likes/\").concat(cardId), {\n    method: 'DELETE',\n    headers: CONFIG.headers\n  }).then(handleResponse);\n}\nfunction deleteCard(cardId) {\n  return fetch(\"\".concat(CONFIG.baseUrl, \"/cards/\").concat(cardId), {\n    method: 'DELETE',\n    headers: CONFIG.headers\n  }).then(handleResponse);\n}\nfunction updateAvatar(avatarUrl) {\n  return fetch(\"\".concat(CONFIG.baseUrl, \"/users/me/avatar\"), {\n    method: 'PATCH',\n    headers: CONFIG.headers,\n    body: JSON.stringify({\n      avatar: avatarUrl\n    })\n  }).then(handleResponse);\n}\n\n//# sourceURL=webpack://yandex_practikum/./src/components/api.js?");

/***/ }),

/***/ "./src/components/card.js":
/*!********************************!*\
  !*** ./src/components/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard),\n/* harmony export */   deleteCard: () => (/* binding */ deleteCard)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api.js */ \"./src/components/api.js\");\n\nfunction createCard(name, link, cardTemplate, openImagePopupCallback, deleteCardCallback) {\n  var likes = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : [];\n  var ownerId = arguments.length > 6 ? arguments[6] : undefined;\n  var currentUserId = arguments.length > 7 ? arguments[7] : undefined;\n  var cardId = arguments.length > 8 ? arguments[8] : undefined;\n  var card = cardTemplate.querySelector('.card').cloneNode(true);\n  var cardTitle = card.querySelector('.card__title');\n  var cardImage = card.querySelector('.card__image');\n  var likeButton = card.querySelector('.card__like-button');\n  var deleteButton = card.querySelector('.card__delete-button');\n  var likeCounter = card.querySelector('.card__like-counter');\n  cardTitle.textContent = name;\n  cardImage.src = link;\n  cardImage.alt = name;\n\n  // Устанавливаем количество лайков и проверяем, был ли лайк уже поставлен текущим пользователем\n  var isLikedByCurrentUser = likes.some(function (like) {\n    return like._id === currentUserId;\n  });\n  var likesCount = likes.length;\n  likeCounter.textContent = likesCount;\n  if (isLikedByCurrentUser) {\n    likeButton.classList.add('card__like-button_is-active');\n  }\n  if (likesCount > 0) {\n    likeCounter.classList.add('card__like-counter_is-active');\n  }\n\n  // Добавляем обработчик для лайка\n  likeButton.addEventListener('click', function () {\n    return handleLikeButton(cardId, likeButton, likeCounter);\n  });\n\n  // Показываем или скрываем иконку удаления карточки в зависимости от принадлежности текущему пользователю\n  if (ownerId === currentUserId) {\n    deleteButton.addEventListener('click', function () {\n      return handleDeleteCard(card, cardId, deleteCardCallback);\n    });\n  } else {\n    deleteButton.remove();\n  }\n  cardImage.addEventListener('click', function () {\n    return openImagePopupCallback(name, link);\n  });\n  return card;\n}\nfunction handleLikeButton(cardId, likeButton, likeCounter) {\n  var isLiked = likeButton.classList.contains('card__like-button_is-active');\n  var action = isLiked ? _api_js__WEBPACK_IMPORTED_MODULE_0__.removeLike : _api_js__WEBPACK_IMPORTED_MODULE_0__.addLike;\n  action(cardId).then(function (updatedCard) {\n    // Обновляем состояние кнопки и счетчика лайков\n    likeButton.classList.toggle('card__like-button_is-active');\n    likeCounter.textContent = updatedCard.likes.length;\n\n    // Проверяем, нужно ли добавить класс для активного счетчика лайков\n    if (updatedCard.likes.length > 0) {\n      likeCounter.classList.add('card__like-counter_is-active');\n    } else {\n      likeCounter.classList.remove('card__like-counter_is-active');\n    }\n  }).catch(function (error) {\n    console.error(error);\n  });\n}\nfunction handleDeleteCard(card, cardId, deleteCardCallback) {\n  var isConfirmed = confirm('Вы уверены, что хотите удалить эту карточку?');\n  if (isConfirmed) {\n    (0,_api_js__WEBPACK_IMPORTED_MODULE_0__.deleteCard)(cardId).then(function () {\n      deleteCardCallback(card);\n    }).catch(function (error) {\n      console.error(\"\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430 \\u043F\\u0440\\u0438 \\u0443\\u0434\\u0430\\u043B\\u0435\\u043D\\u0438\\u0438 \\u043A\\u0430\\u0440\\u0442\\u043E\\u0447\\u043A\\u0438: \".concat(error));\n    });\n  }\n}\nfunction deleteCard(card) {\n  card.remove();\n}\n\n//# sourceURL=webpack://yandex_practikum/./src/components/card.js?");

/***/ }),

/***/ "./src/components/modal.js":
/*!*********************************!*\
  !*** ./src/components/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeModal: () => (/* binding */ closeModal),\n/* harmony export */   handleDocumentKeydown: () => (/* binding */ handleDocumentKeydown),\n/* harmony export */   handleModalClick: () => (/* binding */ handleModalClick),\n/* harmony export */   openModal: () => (/* binding */ openModal)\n/* harmony export */ });\n\nvar handleDocumentKeydown = function handleDocumentKeydown(event) {\n  if (event.key === 'Escape') {\n    closeModal(document.querySelector('.popup_is-opened'));\n  }\n};\nvar openModal = function openModal(element) {\n  element.classList.add('popup_is-opened');\n  element.classList.add('popup_is-animated');\n  document.addEventListener('keydown', handleDocumentKeydown);\n};\nvar closeModal = function closeModal(element) {\n  document.removeEventListener('keydown', handleDocumentKeydown);\n  element.classList.remove('popup_is-opened');\n};\nvar handleModalClick = function handleModalClick(event) {\n  if (event.target.classList.contains('popup_is-opened')) {\n    return closeModal(event.target);\n  }\n  if (event.target.closest('.popup__close')) {\n    return closeModal(event.target.closest('.popup'));\n  }\n};\n\n//# sourceURL=webpack://yandex_practikum/./src/components/modal.js?");

/***/ }),

/***/ "./src/components/validation.js":
/*!**************************************!*\
  !*** ./src/components/validation.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   clearValidation: () => (/* binding */ clearValidation),\n/* harmony export */   enableValidation: () => (/* binding */ enableValidation)\n/* harmony export */ });\nvar showInputError = function showInputError(formElement, inputElement, errorMessage, config) {\n  var errorElement = formElement.querySelector(\".\".concat(inputElement.id, \"-error\"));\n  inputElement.classList.add(config.inputErrorClass);\n  errorElement.textContent = errorMessage;\n  errorElement.classList.add(config.errorClass);\n};\nvar hideInputError = function hideInputError(formElement, inputElement, config) {\n  var errorElement = formElement.querySelector(\".\".concat(inputElement.id, \"-error\"));\n  inputElement.classList.remove(config.inputErrorClass);\n  errorElement.classList.remove(config.errorClass);\n  errorElement.textContent = '';\n};\nvar isValid = function isValid(formElement, inputElement, config) {\n  if (!inputElement.validity.valid) {\n    var errorMessage = inputElement.validity.patternMismatch ? inputElement.dataset.errorMessagePattern : inputElement.validationMessage;\n    showInputError(formElement, inputElement, errorMessage, config);\n  } else {\n    hideInputError(formElement, inputElement, config);\n  }\n};\nvar hasInvalidInput = function hasInvalidInput(inputList) {\n  return inputList.some(function (inputElement) {\n    return !inputElement.validity.valid;\n  });\n};\nvar toggleButtonState = function toggleButtonState(inputList, buttonElement, config) {\n  if (hasInvalidInput(inputList)) {\n    buttonElement.disabled = true;\n    buttonElement.classList.add(config.inactiveButtonClass);\n  } else {\n    buttonElement.disabled = false;\n    buttonElement.classList.remove(config.inactiveButtonClass);\n  }\n};\nvar setEventListeners = function setEventListeners(formElement, config) {\n  var inputList = Array.from(formElement.querySelectorAll(config.inputSelector));\n  var buttonElement = formElement.querySelector(config.submitButtonSelector);\n  toggleButtonState(inputList, buttonElement, config);\n  inputList.forEach(function (inputElement) {\n    inputElement.addEventListener('input', function () {\n      isValid(formElement, inputElement, config);\n      toggleButtonState(inputList, buttonElement, config);\n    });\n    inputElement.addEventListener('focus', function () {\n      isValid(formElement, inputElement, config);\n    });\n  });\n};\nvar enableValidation = function enableValidation(config) {\n  var formList = Array.from(document.querySelectorAll(config.formSelector));\n  formList.forEach(function (formElement) {\n    setEventListeners(formElement, config);\n  });\n};\nvar clearValidation = function clearValidation(formElement, config) {\n  var shouldClearValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;\n  var inputList = Array.from(formElement.querySelectorAll(config.inputSelector));\n  var buttonElement = formElement.querySelector(config.submitButtonSelector);\n  inputList.forEach(function (inputElement) {\n    hideInputError(formElement, inputElement, config);\n    if (shouldClearValues) {\n      inputElement.value = ''; // Очищаем значение поля только если нужно\n    }\n  });\n  toggleButtonState(inputList, buttonElement, config);\n};\n\n\n//# sourceURL=webpack://yandex_practikum/./src/components/validation.js?");

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _images_logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../images/logo.svg */ \"./src/images/logo.svg\");\n/* harmony import */ var _images_avatar_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../images/avatar.jpg */ \"./src/images/avatar.jpg\");\n/* harmony import */ var _images_edit_icon_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../images/edit-icon.svg */ \"./src/images/edit-icon.svg\");\n/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/modal.js */ \"./src/components/modal.js\");\n/* harmony import */ var _components_card_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/card.js */ \"./src/components/card.js\");\n/* harmony import */ var _components_validation_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/validation.js */ \"./src/components/validation.js\");\n/* harmony import */ var _components_api_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/api.js */ \"./src/components/api.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n// index.js\n\n\n\n\n\n\n\n\n\nvar validationConfig = {\n  formSelector: '.popup__form',\n  inputSelector: '.popup__input',\n  submitButtonSelector: '.popup__button',\n  inactiveButtonClass: 'popup__button_disabled',\n  inputErrorClass: 'popup__input_type_error',\n  errorClass: 'popup__error_visible'\n};\nvar formEditProfile = document.querySelector('.popup_type_edit form');\nvar formNewCard = document.querySelector('.popup_type_new-card form');\nvar cardFormSubmitButton = formNewCard.querySelector('.popup__button');\nvar profileEditButton = document.querySelector('.profile__edit-button');\nvar profileAddButton = document.querySelector('.profile__add-button');\nvar popupEditProfile = document.querySelector('.popup_type_edit');\nvar profileEditFormSubmitButton = formEditProfile.querySelector('.popup__button');\nvar popupNewCard = document.querySelector('.popup_type_new-card');\nvar popupImage = document.querySelector('.popup_type_image');\nvar cardTemplate = document.querySelector('#card-template').content;\nvar list = document.querySelector('.places__list');\nvar profileTitle = document.querySelector('.profile__title');\nvar profileDescription = document.querySelector('.profile__description');\nvar popupImageElement = popupImage.querySelector('.popup__image');\nvar popupCaption = popupImage.querySelector('.popup__caption');\nvar nameInputEditProfile = formEditProfile.querySelector('.popup__input_type_name');\nvar nameInputNewCard = formNewCard.querySelector('.popup__input_type_card-name');\nvar linkInputNewCard = formNewCard.querySelector('.popup__input_type_url');\nvar jobInput = formEditProfile.querySelector('.popup__input_type_description');\nvar currentUserId = '';\nvar profileImage = document.querySelector('.profile__image');\nvar profileAvatarContainer = document.querySelector('.profile__avatar-container');\n\n// Находим элементы формы и кнопки\nvar avatarForm = document.forms['avatar-form'];\nvar avatarInput = avatarForm.querySelector('input[name=\"avatar\"]');\nvar profileImageFormSubmitButton = avatarForm.querySelector('.popup__button');\nvar avatarPopup = document.querySelector('.popup_type_avatar');\nvar renderLoading = function renderLoading(_ref) {\n  var buttonElement = _ref.buttonElement,\n    isLoading = _ref.isLoading;\n  if (isLoading) {\n    buttonElement.textContent = 'Сохранение...';\n  } else {\n    buttonElement.textContent = 'Сохранить';\n  }\n};\nprofileAvatarContainer.addEventListener('click', function () {\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_4__.openModal)(avatarPopup);\n});\n\n// Обработка отправки формы\navatarForm.addEventListener('submit', function (event) {\n  event.preventDefault();\n  var avatarUrl = avatarInput.value;\n  renderLoading({\n    buttonElement: profileImageFormSubmitButton,\n    isLoading: true\n  });\n  (0,_components_api_js__WEBPACK_IMPORTED_MODULE_7__.updateAvatar)(avatarUrl).then(function (userData) {\n    profileImage.style.backgroundImage = \"url(\".concat(userData.avatar, \")\");\n    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_4__.closeModal)(avatarPopup);\n  }).catch(function (error) {\n    console.error(\"\\u041E\\u0448\\u0438\\u0431\\u043A\\u0430 \\u043F\\u0440\\u0438 \\u043E\\u0431\\u043D\\u043E\\u0432\\u043B\\u0435\\u043D\\u0438\\u0438 \\u0430\\u0432\\u0430\\u0442\\u0430\\u0440\\u0430: \".concat(error));\n  }).finally(function () {\n    renderLoading({\n      buttonElement: profileImageFormSubmitButton,\n      isLoading: false\n    });\n  });\n});\ndocument.addEventListener('click', _components_modal_js__WEBPACK_IMPORTED_MODULE_4__.handleModalClick);\nPromise.all([(0,_components_api_js__WEBPACK_IMPORTED_MODULE_7__.getUserInfo)(), (0,_components_api_js__WEBPACK_IMPORTED_MODULE_7__.getInitialCards)()]).then(function (_ref2) {\n  var _ref3 = _slicedToArray(_ref2, 2),\n    userInfo = _ref3[0],\n    cards = _ref3[1];\n  currentUserId = userInfo._id;\n  profileImage.style.backgroundImage = \"url(\".concat(userInfo.avatar, \")\");\n  profileTitle.textContent = userInfo.name;\n  profileDescription.textContent = userInfo.about;\n  cards.forEach(function (card) {\n    var newCard = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_5__.createCard)(card.name, card.link, cardTemplate, openImagePopup, _components_card_js__WEBPACK_IMPORTED_MODULE_5__.deleteCard, card.likes, card.owner._id, currentUserId, card._id);\n    list.appendChild(newCard);\n  });\n}).catch(function (error) {\n  console.error(error);\n});\nprofileEditButton.addEventListener('click', function () {\n  var tempNameValue = profileTitle.textContent;\n  var tempJobValue = profileDescription.textContent;\n  nameInputEditProfile.value = tempNameValue;\n  jobInput.value = tempJobValue;\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_4__.openModal)(popupEditProfile);\n  (0,_components_validation_js__WEBPACK_IMPORTED_MODULE_6__.clearValidation)(formEditProfile, validationConfig);\n});\npopupEditProfile.addEventListener('click', function (event) {\n  if (event.target.classList.contains('popup__close')) {\n    nameInputEditProfile.value = '';\n    jobInput.value = '';\n  }\n});\npopupEditProfile.addEventListener('click', _components_modal_js__WEBPACK_IMPORTED_MODULE_4__.handleModalClick);\npopupNewCard.addEventListener('click', _components_modal_js__WEBPACK_IMPORTED_MODULE_4__.handleModalClick);\nformEditProfile.addEventListener('submit', function (evt) {\n  evt.preventDefault();\n  renderLoading({\n    buttonElement: profileEditFormSubmitButton,\n    isLoading: true\n  });\n  (0,_components_api_js__WEBPACK_IMPORTED_MODULE_7__.updateUserInfo)(nameInputEditProfile.value, jobInput.value).then(function (userInfo) {\n    profileTitle.textContent = userInfo.name;\n    profileDescription.textContent = userInfo.about;\n    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_4__.closeModal)(popupEditProfile);\n  }).catch(function (error) {\n    console.error(error);\n  }).finally(function () {\n    renderLoading({\n      buttonElement: profileEditFormSubmitButton,\n      isLoading: false\n    });\n  });\n});\nprofileAddButton.addEventListener('click', function () {\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_4__.openModal)(popupNewCard);\n  (0,_components_validation_js__WEBPACK_IMPORTED_MODULE_6__.clearValidation)(formNewCard, validationConfig, true);\n});\nformNewCard.addEventListener('submit', function (evt) {\n  evt.preventDefault();\n  var name = nameInputNewCard.value;\n  var link = linkInputNewCard.value;\n  renderLoading({\n    buttonElement: cardFormSubmitButton,\n    isLoading: true\n  });\n  (0,_components_api_js__WEBPACK_IMPORTED_MODULE_7__.addCard)(name, link).then(function (card) {\n    var newCard = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_5__.createCard)(card.name, card.link, cardTemplate, openImagePopup, _components_card_js__WEBPACK_IMPORTED_MODULE_5__.deleteCard, card.likes, card.owner._id, currentUserId, card._id);\n    list.prepend(newCard);\n    formNewCard.reset();\n    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_4__.closeModal)(popupNewCard);\n  }).catch(function (error) {\n    console.error(error);\n  }).finally(function () {\n    renderLoading({\n      buttonElement: cardFormSubmitButton,\n      isLoading: false\n    });\n  });\n});\nfunction handleNewCardFormSubmit(evt) {\n  evt.preventDefault();\n  var newCard = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_5__.createCard)(nameInputNewCard.value, linkInputNewCard.value, cardTemplate, openImagePopup, _components_card_js__WEBPACK_IMPORTED_MODULE_5__.deleteCard);\n  nameInputNewCard.value = '';\n  linkInputNewCard.value = '';\n  list.prepend(newCard);\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_4__.closeModal)(popupNewCard);\n}\npopupImage.addEventListener('click', function (event) {\n  if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {\n    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_4__.closeModal)(popupImage);\n  }\n});\nfunction openImagePopup(name, link) {\n  popupImageElement.src = link;\n  popupImageElement.alt = name;\n  popupCaption.textContent = name;\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_4__.openModal)(popupImage);\n}\n;\n(0,_components_validation_js__WEBPACK_IMPORTED_MODULE_6__.enableValidation)(validationConfig);\n\n//# sourceURL=webpack://yandex_practikum/./src/pages/index.js?");

/***/ }),

/***/ "./src/pages/index.css":
/*!*****************************!*\
  !*** ./src/pages/index.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://yandex_practikum/./src/pages/index.css?");

/***/ }),

/***/ "./src/images/avatar.jpg":
/*!*******************************!*\
  !*** ./src/images/avatar.jpg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"images/avatar.6666407ac3aa5af1d5de.jpg\";\n\n//# sourceURL=webpack://yandex_practikum/./src/images/avatar.jpg?");

/***/ }),

/***/ "./src/images/edit-icon.svg":
/*!**********************************!*\
  !*** ./src/images/edit-icon.svg ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"images/edit-icon.a086f758840ae814ecde.svg\";\n\n//# sourceURL=webpack://yandex_practikum/./src/images/edit-icon.svg?");

/***/ }),

/***/ "./src/images/logo.svg":
/*!*****************************!*\
  !*** ./src/images/logo.svg ***!
  \*****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"images/logo.fc3e6875d825f899a98d.svg\";\n\n//# sourceURL=webpack://yandex_practikum/./src/images/logo.svg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/pages/index.js");
/******/ 	
/******/ })()
;