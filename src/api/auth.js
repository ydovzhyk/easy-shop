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

instance.interceptors.response.use(
  response => response,
  async error => {
    if (
      error.response.status === 401 &&
      error.response.data.message === 'Unauthorized'
    ) {
      try {
        const authData = JSON.parse(localStorage.getItem('easy-shop.authData'));
        const { refreshToken, sid } = authData;

        token.set(refreshToken);
        const { data } = await instance.post('/auth/refresh', { sid });
        token.unset();

        const authNewData = {
          accessToken: data.newAccessToken,
          refreshToken: data.newRefreshToken,
          sid: data.sid,
        };

        await localStorage.setItem(
          'easy-shop.authData',
          JSON.stringify(authNewData)
        );

        if (error.config.url === '/auth/current') {
          const authData = JSON.parse(
            localStorage.getItem('easy-shop.authData')
          );

          const { accessToken, refreshToken, sid } = authData;

          const originalRequest = error.config;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.data = {
            accessToken: accessToken,
            refreshToken: refreshToken,
            sid: sid,
          };
          return instance(originalRequest);
        } else {
          const authData = JSON.parse(
            localStorage.getItem('easy-shop.authData')
          );

          const { accessToken } = authData;

          const originalRequest = error.config;
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
          return instance(originalRequest);
        }
      } catch (error) {
        return Promise.reject(error);
      }
    } else if (
      error.response.status === 401 &&
      error.response.data.message === 'Refresh end'
    ) {
      const authData = {
        accessToken: null,
        refreshToken: null,
        sid: null,
      };
      localStorage.setItem('easy-shop.authData', JSON.stringify(authData));
      return;
    } else {
      return Promise.reject(error);
    }
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
  console.log('userData', userData);
  const { data } = await instance.post('/auth/likes', userData);
  return data;
};

export default instance;
