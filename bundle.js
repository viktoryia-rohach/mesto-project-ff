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

/***/ "./src/components/card.js":
/*!********************************!*\
  !*** ./src/components/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard),\n/* harmony export */   deleteCard: () => (/* binding */ deleteCard)\n/* harmony export */ });\n// Функция создания карточки\nfunction createCard(name, link, cardTemplate, openImagePopupCallback, deleteCardCallback) {\n  var card = cardTemplate.querySelector('.card').cloneNode(true);\n  var cardTitle = card.querySelector('.card__title');\n  var cardImage = card.querySelector('.card__image');\n  var likeButton = card.querySelector('.card__like-button');\n  var deleteButton = card.querySelector('.card__delete-button');\n  cardTitle.textContent = name;\n  cardImage.src = link;\n  cardImage.alt = name;\n  likeButton.addEventListener('click', handleLikeButton);\n  deleteButton.addEventListener('click', function () {\n    return deleteCardCallback(card);\n  });\n  cardImage.addEventListener('click', function () {\n    return openImagePopupCallback(name, link);\n  });\n  return card;\n}\nfunction handleLikeButton(event) {\n  event.target.classList.toggle('card__like-button_is-active');\n}\nfunction deleteCard(card) {\n  card.remove();\n}\n\n//# sourceURL=webpack://yandex_practikum/./src/components/card.js?");

/***/ }),

/***/ "./src/components/modal.js":
/*!*********************************!*\
  !*** ./src/components/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeModal: () => (/* binding */ closeModal),\n/* harmony export */   handleDocumentKeydown: () => (/* binding */ handleDocumentKeydown),\n/* harmony export */   handleModalClick: () => (/* binding */ handleModalClick),\n/* harmony export */   openModal: () => (/* binding */ openModal)\n/* harmony export */ });\n\nvar handleDocumentKeydown = function handleDocumentKeydown(event) {\n  if (event.key === 'Escape') {\n    closeModal(document.querySelector('.popup_is-opened'));\n  }\n};\nvar openModal = function openModal(element) {\n  element.classList.add('popup_is-opened');\n  element.classList.add('popup_is-animated');\n  document.addEventListener('keydown', handleDocumentKeydown);\n};\nvar closeModal = function closeModal(element) {\n  document.removeEventListener('keydown', handleDocumentKeydown);\n  element.classList.remove('popup_is-opened');\n};\nvar handleModalClick = function handleModalClick(event) {\n  if (event.target.classList.contains('popup_is-opened')) {\n    return closeModal(event.target);\n  }\n  if (event.target.closest('.popup__close')) {\n    return closeModal(event.target.closest('.popup'));\n  }\n};\n\n//# sourceURL=webpack://yandex_practikum/./src/components/modal.js?");

/***/ }),

/***/ "./src/pages/index.js":
/*!****************************!*\
  !*** ./src/pages/index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pages_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pages/index.css */ \"./src/pages/index.css\");\n/* harmony import */ var _images_logo_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../images/logo.svg */ \"./src/images/logo.svg\");\n/* harmony import */ var _images_avatar_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../images/avatar.jpg */ \"./src/images/avatar.jpg\");\n/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/modal.js */ \"./src/components/modal.js\");\n/* harmony import */ var _scripts_cards_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../scripts/cards.js */ \"./src/scripts/cards.js\");\n/* harmony import */ var _components_card_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/card.js */ \"./src/components/card.js\");\n\n\n\n\n\n\nvar formEditProfile = document.querySelector('.popup_type_edit form');\nvar formNewCard = document.querySelector('.popup_type_new-card form');\nvar profileEditButton = document.querySelector('.profile__edit-button');\nvar profileAddButton = document.querySelector('.profile__add-button');\nvar popupEditProfile = document.querySelector('.popup_type_edit');\nvar popupNewCard = document.querySelector('.popup_type_new-card');\nvar popupImage = document.querySelector('.popup_type_image');\nvar cardTemplate = document.querySelector('#card-template').content;\nvar list = document.querySelector('.places__list');\nvar profileTitle = document.querySelector('.profile__title');\nvar profileDescription = document.querySelector('.profile__description');\nvar popupImageElement = popupImage.querySelector('.popup__image');\nvar popupCaption = popupImage.querySelector('.popup__caption');\nvar nameInputEditProfile = formEditProfile.querySelector('.popup__input_type_name');\nvar nameInputNewCard = formNewCard.querySelector('.popup__input_type_card-name');\nvar linkInputNewCard = formNewCard.querySelector('.popup__input_type_url');\nvar jobInput = formEditProfile.querySelector('.popup__input_type_description');\nvar tempNameValue = '';\nvar tempJobValue = '';\nprofileEditButton.addEventListener('click', function () {\n  tempNameValue = profileTitle.textContent;\n  tempJobValue = profileDescription.textContent;\n  nameInputEditProfile.value = tempNameValue;\n  jobInput.value = tempJobValue;\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_3__.openModal)(popupEditProfile);\n});\npopupEditProfile.addEventListener('click', function (event) {\n  if (event.target.classList.contains('popup__close')) {\n    nameInputEditProfile.value = '';\n    jobInput.value = '';\n  }\n});\npopupEditProfile.addEventListener('click', _components_modal_js__WEBPACK_IMPORTED_MODULE_3__.handleModalClick);\nformEditProfile.addEventListener('submit', function (evt) {\n  evt.preventDefault();\n  profileTitle.textContent = nameInputEditProfile.value;\n  profileDescription.textContent = jobInput.value;\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_3__.closeModal)(popupEditProfile);\n});\npopupNewCard.addEventListener('click', _components_modal_js__WEBPACK_IMPORTED_MODULE_3__.handleModalClick);\nprofileAddButton.addEventListener('click', function () {\n  return (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_3__.openModal)(popupNewCard);\n});\nformNewCard.addEventListener('submit', handleNewCardFormSubmit);\nfunction handleNewCardFormSubmit(evt) {\n  evt.preventDefault();\n  var newCard = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_5__.createCard)(nameInputNewCard.value, linkInputNewCard.value, cardTemplate, openImagePopup, _components_card_js__WEBPACK_IMPORTED_MODULE_5__.deleteCard);\n  nameInputNewCard.value = '';\n  linkInputNewCard.value = '';\n  list.prepend(newCard);\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_3__.closeModal)(popupNewCard);\n}\npopupImage.addEventListener('click', function (event) {\n  if (event.target.classList.contains('popup__close') || event.target.classList.contains('popup')) {\n    (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_3__.closeModal)(popupImage);\n  }\n});\n_scripts_cards_js__WEBPACK_IMPORTED_MODULE_4__.initialCards.forEach(function (item) {\n  var card = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_5__.createCard)(item.name, item.link, cardTemplate, openImagePopup, _components_card_js__WEBPACK_IMPORTED_MODULE_5__.deleteCard);\n  list.appendChild(card);\n});\nfunction openImagePopup(name, link) {\n  popupImageElement.src = link;\n  popupImageElement.alt = name;\n  popupCaption.textContent = name;\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_3__.openModal)(popupImage);\n}\n\n//# sourceURL=webpack://yandex_practikum/./src/pages/index.js?");

/***/ }),

/***/ "./src/scripts/cards.js":
/*!******************************!*\
  !*** ./src/scripts/cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initialCards: () => (/* binding */ initialCards)\n/* harmony export */ });\n\nvar initialCards = [{\n  name: \"Архыз\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg\"\n}, {\n  name: \"Челябинская область\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg\"\n}, {\n  name: \"Иваново\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg\"\n}, {\n  name: \"Камчатка\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg\"\n}, {\n  name: \"Холмогорский район\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg\"\n}, {\n  name: \"Байкал\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg\"\n}];\n\n//# sourceURL=webpack://yandex_practikum/./src/scripts/cards.js?");

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