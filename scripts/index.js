// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки 
function createCard(content, cardTemplate, funcDelete, funcLike, funcView) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = content.name;
    cardElement.querySelector('.card__image').src = content.link;
    cardElement.querySelector('.card__image').alt = content.name;
    cardElement.querySelector('.card__like-button').addEventListener('click', funcLike);
    cardElement.querySelector('.card__delete-button').addEventListener('click', funcDelete);
    cardElement.querySelector('.card__image').addEventListener('click', funcView);
    return cardElement;
};

// Функция отметки нравится 
function likeCard (evt) {
    evt.target.classList.toggle('card__like-button_is-active');
};

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.offsetParent.remove();
};

// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    placesList.append(createCard(element, cardTemplate, deleteCard, likeCard, viewImage));
});

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

// ФАЙЛ МОДАЛЬНЫХ ОКОН
// Функция открытия модального окна 
function openModal(element) {
    element.classList.add('popup_is-animated');
    element.classList.add('popup_is-opened');
    document.addEventListener('keydown', closeByEscape);
};

// Функция закрытия модального окна 
function closeModal(element){
    element.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeByEscape);
};

// Функция закрытия модального окна кнопкой Escape
function closeByEscape (element) {
    if (element.key === 'Escape') {
        const openModalWindow = document.querySelector('.popup_is-opened');
        closeModal(openModalWindow);
        document.removeEventListener('keydown', closeByEscape);
    };
};

