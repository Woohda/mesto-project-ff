import './index.css';
import { initialCards, createCard, likeCard, deleteCard } from "./components/cards";
import { closeModal, openModal } from './components/modal';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfile = document.querySelector('.popup_type_edit'); 
const formEditProfile = document.forms.editProfile;
const nameProfile = formEditProfile.elements.name;
const professionProfile = formEditProfile.elements.description;
const addNewPlaceButton = document.querySelector('.profile__add-button');
const newPlace = document.querySelector('.popup_type_new-card');
const formNewPlace = document.forms.newPlace;
const placeName = formNewPlace.elements.placeName;
const placeLink = formNewPlace.elements.link;
const contentImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const cardImageList = document.querySelectorAll('.card__image');
const closeButtonList = document.querySelectorAll('.popup__close');

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    placesList.append(createCard(element, cardTemplate, deleteCard, likeCard, viewImage));
});

// Обработчик события кнопки редактировать профиль
profileEditButton.addEventListener('mouseover', () => (editProfile.classList.add('popup_is-animated')));
profileEditButton.addEventListener('click', () => {
    nameProfile.placeholder = profileTitle.textContent;
    professionProfile.placeholder = profileDescription.textContent;
    openModal(editProfile);
});

// Обработчик события кнопки добавления нового места 
addNewPlaceButton.addEventListener('mouseover', () => (newPlace.classList.add('popup_is-animated')));
addNewPlaceButton.addEventListener('click', () => (openModal(newPlace)));

// Обработчик события открытия изображения 
cardImageList.forEach((element) => {
    element.addEventListener('mouseover', () => (contentImage.classList.add('popup_is-animated')));
}); 

// Функция просмотра изображения карточки 
function viewImage (evt) {
    popupImage.alt = evt.target.alt;
    popupImage.src = evt.target.currentSrc;
    const captionImage = document.querySelector('.popup__caption');
    captionImage.textContent = evt.target.alt;
    openModal(contentImage);
};

// Обработчик события закрытия модального окна по оверлею
[editProfile, newPlace, contentImage].forEach((element) => {
    element.addEventListener('click', (evt) => {
        if (evt.currentTarget === evt.target) {
            closeModal(evt.target);
        };
    });
});

// Обработчик события закрытия модального окна по крестику
closeButtonList.forEach((element) => {
    element.addEventListener('click', () => {
        const openModalWindow = document.querySelector('.popup_is-opened');
        closeModal(openModalWindow);
    });
});

//Работа с формами  
// Функция редактирования профиля
function handleFormSubmit(evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameProfile.value;
    profileDescription.textContent = professionProfile.value;
    const openModalWindow = document.querySelector('.popup_is-opened');
    closeModal(openModalWindow);
}

// Функция добавления новой карточки
function addCard (evt) {
    evt.preventDefault();
    const newCard = {
    name: placeName.value,
    link: placeLink.value
    };
    placesList.prepend(createCard(newCard, cardTemplate, deleteCard, likeCard, viewImage));
    formNewPlace.reset(); 
    const openModalWindow = document.querySelector('.popup_is-opened');
    closeModal(openModalWindow);
};

// Обработчик события на изменение профиля
formEditProfile.addEventListener('submit', handleFormSubmit);

// Обработчик события на добавление карточки
formNewPlace.addEventListener('submit', addCard);


// const сousteauImage = new URL('../images/avatar.jpg', import.meta.url);


// const profileImage= document.querySelector('.profile__image');
// profileImage.style.backgroundColor = сousteauImage;