import axios from 'axios';

// const REACT_APP_API_URL = 'http://localhost:4000';
const REACT_APP_API_URL = 'https://easy-shop-backend.herokuapp.com/';

export const instance = axios.create({
  baseURL: REACT_APP_API_URL,
});

const token = {
  set(accessToken) {
    instance.defaults.headers.Authorization = `Bearer ${accessToken}`;
  },
  unset() {
    instance.defaults.headers.Authorization = null;
  },
};

export const axiosRegister = async userData => {
  const { data } = await instance.post('/auth/register', userData);
  return data;
};

export const axiosLogin = async userData => {
  const { data } = await instance.post('/auth/login', userData);
  token.set(data.accessToken);
  return data;
};

export const axiosLogout = async accessToken => {
  token.set(accessToken);
  const { data } = await instance.post('/auth/logout');
  token.unset();
  return data;
};

export const axiosRefresh = async (sid, refreshToken) => {
  token.set(refreshToken);
  const { data } = await instance.post('/auth/refresh', { sid });
  token.unset();
  return data;
};

export const axiosUpdateUser = async accessToken => {
  token.set(accessToken);
  const { data } = await instance.post('/auth/current');
  return data;
};

export default instance;
