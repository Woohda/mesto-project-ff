import './index.css';
import { createCard, likeCard, deleteCard } from "./components/cards";
import { closeModal, openModal } from './components/modal';
import { enableValidation, clearValidation } from './components/validation';
import { getInitialCards, getUserProfile, changeUserProfile, changeUserAvatar, addNewPlaceCard} from './components/api';


// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template');

// @todo: DOM узлы
// переменная листа карточек
const placesList = document.querySelector('.places__list');

// переменные аватара профиля
const containerProfileAvatar = document.querySelector('.profile__avatar-container');
const profileAvatar = containerProfileAvatar.querySelector('.profile__avatar');
const popupFormAvatar = document.querySelector('.popup_type_new-avatar');
const formChangeAvatar = document.forms.avatar;
const avatarLink = formChangeAvatar.elements.avatarLink;

// переменные профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const buttonOpenPopupProfile = document.querySelector('.profile__edit-button');
const popupFormProfile = document.querySelector('.popup_type_edit'); 
const formEditProfile = document.forms.editProfile;
const nameProfile = formEditProfile.elements.name;
const professionProfile = formEditProfile.elements.description;

// переменные добавления новой карточки
const buttonOpenPopupCard = document.querySelector('.profile__add-button');
const popupFormCard = document.querySelector('.popup_type_new-card');
const formNewPlace = document.forms.newPlace;
const placeName = formNewPlace.elements.placeName;
const placeLink = formNewPlace.elements.link;

// переменные просмотра изображений карточек
const popupViewImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const captionImage = document.querySelector('.popup__caption');

// переменные кнопок попапа
const buttonClosePopupList = document.querySelectorAll('.popup__close');
const buttonPopupSubmit = document.querySelector('.popup__button');

// конфиг валидации
const configValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// работа с сервером 
// получение профиля юзера и карточек с сервера
Promise.all([getUserProfile(), getInitialCards()])
  .then((data) => { 
    profileTitle.textContent = data[0].name;
    profileDescription.textContent = data[0].about;
    profileAvatar.src = data[0].avatar;
    profileAvatar.alt = data[0].name;
    data[1].forEach((element)=> {
      placesList.append(createCard(element, cardTemplate, deleteCard, likeCard, viewImage, data[0]._id)); // выводим карточки на страницу
    })
  })
  .catch((err) => {
    console.log(err); // выводим ошибку в консоль
  }); 

//работа с данными профиля 
// Обработчик события кнопки редактировать профиль
buttonOpenPopupProfile.addEventListener('click', () => {
  nameProfile.value = profileTitle.textContent;
  professionProfile.value = profileDescription.textContent;
  clearValidation(formEditProfile, configValidation);  // очистка ошибок валидации вызовом clearValidation
  enableValidation(configValidation);  // включение валидации вызовом enableValidation
  openModal(popupFormProfile);  // открытие модального окна  
});

// Обработчик события изменеия аватара
containerProfileAvatar.addEventListener('click', () => {
  formChangeAvatar.reset();
  clearValidation(formChangeAvatar, configValidation);  // очистка ошибок валидации вызовом clearValidation
  enableValidation(configValidation);  // включение валидации вызовом enableValidation
  openModal(popupFormAvatar);  // открытие модального окна 
});

// Функция редактирования профиля
function editUserProfile() {
  profileTitle.textContent = nameProfile.value;
  profileDescription.textContent = professionProfile.value;
  changeUserProfile(nameProfile.value, professionProfile.value) // отправляем обновленные данные на сервер 
  closeModal(popupFormProfile);
};

// Функция редактирования аватара профиля
function changeAvatarProfile() {
  profileAvatar.src = avatarLink.value;
  changeUserAvatar(avatarLink.value) // отправляем обновленные данные на сервер 
  closeModal(popupFormAvatar);
};

// Обработчик события на изменение профиля
formEditProfile.addEventListener('submit', editUserProfile);

// Обработчик события на изменение аватара профиля
formChangeAvatar.addEventListener('submit', changeAvatarProfile)

// работа с данными карточки
// Обработчик события кнопки добавления нового места 
buttonOpenPopupCard.addEventListener('click', () => {
  formNewPlace.reset();
  clearValidation(formNewPlace, configValidation);  // очистка ошибок валидации вызовом clearValidation
  enableValidation(configValidation);  // включение валидации вызовом enableValidation
  openModal(popupFormCard);  // открытие модального окна 
});

// Функция добавления новой карточки
function addNewPlace () {
  const newPlace = {
  name: placeName.value,
  link: placeLink.value
  };
  addNewPlaceCard(newPlace)
  .then((data) => { 
    placesList.prepend(createCard(data, cardTemplate, deleteCard, likeCard, viewImage, data.owner._id));// выводим карточки на страницу
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    }); 
  formNewPlace.reset(); 
  closeModal(popupFormCard);
};

// Обработчик события на добавление карточки
formNewPlace.addEventListener('submit', addNewPlace);

// Функция просмотра изображения карточки 
function viewImage (evt) {
    popupImage.alt = evt.target.alt;
    popupImage.src = evt.target.currentSrc;
    captionImage.textContent = evt.target.alt;
    openModal(popupViewImage);
};

// Добавление класса анимации на модальные окна
[popupFormProfile, popupFormCard, popupViewImage, popupFormAvatar].forEach((element) => {
    element.classList.add('popup_is-animated');
});

// Обработчик события закрытия модального окна по оверлею
[popupFormProfile, popupFormCard, popupViewImage, popupFormAvatar].forEach((element) => {
    element.addEventListener('click', (evt) => {
        if (evt.currentTarget === evt.target) {
            closeModal(evt.target); 
        };
    });
});

// Обработчик события закрытия модального окна по крестику
buttonClosePopupList.forEach((element) => {
    element.addEventListener('click', () => {
        const openModalWindow = document.querySelector('.popup_is-opened');
        closeModal(openModalWindow); 
    });
});

