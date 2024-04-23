// @todo: Функция создания карточки 
function createCard(content, cardTemplate, funcDelete, funcLike, funcView) {
  const cardElement = cardTemplate.content.querySelector('.places__item').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = content.name;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = content.link;
  cardImage.alt = content.name;
  cardElement.querySelector('.card__like-button').addEventListener('click', funcLike);
  cardElement.querySelector('.card__delete-button').addEventListener('click', funcDelete);
  cardImage.addEventListener('click', funcView);
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

export {createCard, likeCard, deleteCard}