const configApi = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-13',
    headers: {
      authorization: '11ff808f-beef-490c-87dc-c340f83cf828',
      'Content-Type': 'application/json'
    }
};
  
export const  getInitialCards = async () => {
    const data = await fetch(`${configApi.baseUrl}/cards`, {
        headers: configApi.headers
    });
    if (data.ok) {
        return data.json();
    }
    return await Promise.reject(`Ошибка: ${data.status}`);
};