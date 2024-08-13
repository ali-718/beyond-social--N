import { LOGIN_USER } from 'src/config/Apis';
import { client } from 'src/config/client';
import { fetchDocumentsById } from 'src/Firebase Functions/ReadDocument';

export const retrieveToken = () => {
  const token = localStorage.getItem('userToken');

  if (token != null) {
    return token;
  }
  return '';
};

export const retrieveUser = () => {
  const token = localStorage.getItem('user');

  if (token !== null && token !== 'null') {
    return JSON.parse(token);
  }
  return '';
};

export const retrieveUserAsync = async () => {
  const token = localStorage.getItem('user');

  if (token !== null && token !== 'null') {
    const user = JSON.parse(token);
    try {
      const dbUser = await fetchDocumentsById({ collectionName: 'users', id: user?.id, where: '' });
      return Promise.resolve(dbUser);
    } catch (error) {
      Promise.reject(`${error}`);
    }
  } else {
    return Promise.reject('');
  }
};

export const changeTheUser = (userDetails) => {
  client.post(LOGIN_USER, userDetails).then((res) => {
    window.location.reload();
    localStorage.setItem('userToken', res.data.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.data));
  });
};
