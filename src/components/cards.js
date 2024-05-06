import { deletePlaceCard, putLike, removeLike } from "./api";

// @todo: Функция создания карточки 
function createCard(content, cardTemplate, funcDelete, funcLike, funcView, user) {
  const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = content.name;
  const cardImage = cardElement.querySelector('.card__image');
  const buttonLike = cardElement.querySelector('.card__like-button');
  const buttonDelete = cardElement.querySelector('.card__delete-button');
  cardImage.src = content.link;
  cardImage.alt = content.name;
  buttonLike.dataset.likes = content.likes.length;
  cardElement.dataset.cardId = content._id;
  isLiked(content.likes, user, buttonLike); // проверяем есть ли мой лайк на карточке 
  buttonLike.addEventListener('click', funcLike);
  if (content.owner._id === user) {
    buttonDelete.addEventListener('click', funcDelete);
  } else {
    buttonDelete.setAttribute('hidden', true)
  }
  cardImage.addEventListener('click', funcView);
  return cardElement;
};

// Функция отметки нравится 
function likeCard (evt) {
  const cardId = evt.target.offsetParent.dataset.cardId;
  if (!evt.target.classList.contains('card__like-button_is-active')) {
    putLike(cardId)
      .then ((data) => {
        evt.target.classList.add('card__like-button_is-active');
        evt.target.setAttribute('data-likes', `${data.likes.length}`) 
      })
  } else {
    removeLike(cardId)
    .then ((data) => {
      evt.target.classList.remove('card__like-button_is-active');
      evt.target.setAttribute('data-likes', `${data.likes.length}`) 
    })
  };
};

// @todo: Функция удаления карточки
function deleteCard(evt) {
  deletePlaceCard(evt.target.offsetParent.dataset.cardId)
  .then(evt.target.offsetParent.remove()); 
};

// функция проверки лайка на карточке
function isLiked(arr, id, button) {
  if(arr.some((user) => user._id === id)) {
    button.classList.add('card__like-button_is-active');
  }
}

export {createCard, likeCard, deleteCard}   