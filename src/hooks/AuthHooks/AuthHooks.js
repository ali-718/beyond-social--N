import { LOGIN_USER } from 'src/config/Apis';
import { client } from 'src/config/client';

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

export const changeTheUser = (userDetails) => {
  client.post(LOGIN_USER, userDetails).then((res) => {
    window.location.reload();
    localStorage.setItem('userToken', res.data.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.data));
  });
};
