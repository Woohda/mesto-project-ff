const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

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

export {initialCards, createCard, likeCard, deleteCard}