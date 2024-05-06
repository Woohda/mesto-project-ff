const configApi = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
    headers: {
      authorization: '11ff808f-beef-490c-87dc-c340f83cf828',
      'Content-Type': 'application/json'
    }
};

// // функция проверки ответа от сервера 
function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return Promise.resolve(res.json());
}

// функция получения карточек с сервера 
export const  getInitialCards = async () => {
    const data = await fetch(`${configApi.baseUrl}/cards`, {
        headers: configApi.headers
    });
    return getResponseData(data);
};

// функция добавления карточки на сервер
export const addNewPlaceCard = async (newPlace) => {
    const data = await fetch(`${configApi.baseUrl}/cards`, {
        method: 'POST',
        headers: configApi.headers,
        body: JSON.stringify({
            name: newPlace.name,
            link: newPlace.link
          })
    });
    return getResponseData(data);
};
 
// функци удаления карточки с сервера
export const deletePlaceCard = async (cardId) => {
    const data = await fetch(`${configApi.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: configApi.headers
    })
    return getResponseData(data);
};


// функция получения информации профиля с сервера
export const getUserProfile = async () => {
    const data = await fetch(`${configApi.baseUrl}/users/me`, {
        headers: configApi.headers
    });
    return getResponseData(data);
};

// функция обновления данных профиля на сервере 
export const changeUserProfile = async (name, about) => {
    const data = await fetch(`${configApi.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: configApi.headers,
        body: JSON.stringify({
            name,
            about
          })
    });
    return getResponseData(data);
};

// функция обновления аватара профиля на сервере 
export const changeUserAvatar = async (avatar) => {
    const data = await fetch(`${configApi.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: configApi.headers,
        body: JSON.stringify({
            avatar
          })
    });
    return getResponseData(data);
};

// функции обновления отмети мне нравится
export const putLike = async (cardId) => {
    const data = await fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: configApi.headers
    });
    return getResponseData(data);
};
export const removeLike = async (cardId) => {
    const data = await fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: configApi.headers
    });
    return getResponseData(data);
};

