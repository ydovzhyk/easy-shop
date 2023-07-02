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

let reqUrl = '';
let newData = {};
instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response.status === 401) {
      const authData = JSON.parse(localStorage.getItem('easy-shop.authData'));
      const { refreshToken, sid } = authData;
      try {
        if (reqUrl !== '/auth/current') {
          token.set(refreshToken);
          const { data } = await instance.post('/auth/refresh', { sid });
          token.unset();

          const authNewData = {
            accessToken: data.newAccessToken,
            refreshToken: data.newRefreshToken,
            sid: data.sid,
          };

          localStorage.setItem(
            'easy-shop.authData',
            JSON.stringify(authNewData)
          );
          newData = authNewData;
        }

        if (error.config.url === '/auth/current') {
          reqUrl = '/auth/current';
          const originalRequest = error.config;
          originalRequest.data = {
            accessToken: newData.accessToken,
            refreshToken: newData.refreshToken,
            sid: newData.sid,
          };
          return instance(error.config);
        } else {
          const originalRequest = error.config;
          originalRequest.headers[
            'Authorization'
          ] = `Bearer ${newData.accessToken}`;
          return instance(originalRequest);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

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

export const axiosUpdateUser = async (accessToken, userData) => {
  token.set(accessToken);
  const { data } = await instance.post('/auth/current', userData);
  return data;
};

export const axiosUpdateUserBasket = async userData => {
  const { data } = await instance.post('/auth/basket', userData);
  return data;
};

export const axiosUpdateUserLikes = async userData => {
  console.log('2', userData);
  const { data } = await instance.post('/auth/likes', userData);
  return data;
};

export default instance;
