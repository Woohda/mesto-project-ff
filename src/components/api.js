const configApi = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
    headers: {
      authorization: '11ff808f-beef-490c-87dc-c340f83cf828',
      'Content-Type': 'application/json'
    }
};

// функция получения карточек с сервера 
export const  getInitialCards = async () => {
    const data = await fetch(`${configApi.baseUrl}/cards`, {
        headers: configApi.headers
    });
    if (data.ok) {
        return Promise.resolve(data.json());
    }
    return Promise.reject(`Ошибка: ${data.status}`);
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
    if (data.ok) {
        return await data.json();
    }
    return Promise.reject(`Ошибка: ${data.status}`);
};
 
// функци удаления карточки с сервера
export const deletePlaceCard = async (cardId) => {
    const data = await fetch(`${configApi.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: configApi.headers
    })
    if (data.ok) {
        return data.json();
    }
    return Promise.reject(`Ошибка: ${data.status}`);
};


// функция получения информации профиля с сервера
export const getUserProfile = async () => {
    const data = await fetch(`${configApi.baseUrl}/users/me`, {
        headers: configApi.headers
    });
    if (data.ok) {
        return  Promise.resolve(data.json());
    }
    return Promise.reject(`Ошибка: ${data.status}`);
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
    if (data.ok) {
        return data.json();
    }
    return Promise.reject(`Ошибка: ${data.status}`);
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
    if (data.ok) {
        return data.json();
    }
    return Promise.reject(`Ошибка: ${data.status}`);
};

// функции обновления отмети мне нравится
export const putLike = async (cardId) => {
    const data = await fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: configApi.headers
    });
    if (data.ok) {
        return await data.json();
    }
    return Promise.reject(`Ошибка: ${data.status}`);   
};
export const removeLike = async (cardId) => {
    const data = await fetch(`${configApi.baseUrl}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: configApi.headers
    });
    if (data.ok) {
        return await data.json();
    }
    return Promise.reject(`Ошибка: ${data.status}`);
};

