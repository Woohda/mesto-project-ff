// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки 
function createCard(content, func) {
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.card__title').textContent = content.name;
    cardElement.querySelector('.card__image').src = content.link;
    cardElement.querySelector('.card__image').alt = content.name;
    cardElement.querySelector('.card__like-button').addEventListener('click', function (event) {
        event.target.classList.toggle('card__like-button_is-active');
    });
    cardElement.querySelector('.card__delete-button').addEventListener('click', func);
    return cardElement;
};

// @todo: Функция удаления карточки
function deleteCard() {
    const cardElement = this.parentElement;
    cardElement.remove();
};


// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
    placesList.append(createCard(element, deleteCard));
});
