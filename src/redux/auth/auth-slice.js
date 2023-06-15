import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  logout,
  refresh,
  updateUser,
  updateUserSettings,
} from './auth-opetations';

const initialState = {
  user: {
    email: null,
    id: null,
    secondName: null,
    firstName: null,
    surName: null,
    tel: null,
    userAvatar: null,
    cityName: null,
    streetName: null,
    houseNamber: null,
    sex: null,
    about: null,
    orders: [],
    userBasket: [],
    userLikes: [],
    username: null,
  },
  sid: null,
  accessToken: null,
  refreshToken: null,
  isLogin: false,
  loading: false,
  isRefreshing: false,
  error: null,
  newUser: {},
};

const accessAuth = (store, payload) => {
  store.loading = false;
  store.isLogin = true;
  store.user = payload.user;
  store.sid = payload.sid;
  store.accessToken = payload.accessToken;
  store.refreshToken = payload.refreshToken;
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearNewUser: store => {
      store.newUser = {};
    },
    clearUser: () => ({ ...initialState }),
    clearError: store => {
      store.error = null;
    },
  },

  extraReducers: {
    // * REGISTER
    [register.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [register.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.isLogin = false;
      store.newUser = payload;
      store.user = { ...store.user };
      store.sid = '';
      store.accessToken = '';
      store.refreshToken = '';
    },
    [register.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.data.message;
    },
    // * LOGIN
    [login.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [login.fulfilled]: (store, { payload }) => accessAuth(store, payload),
    [login.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.data.message;
    },
    // * LOGOUT
    [logout.pending]: store => {
      store.loading = true;
      store.error = null;
      store.isRefreshing = true;
    },
    [logout.fulfilled]: store => {
      store.user = {};
      store.todaySummary = {};
      store.sid = '';
      store.accessToken = '';
      store.refreshToken = '';
      store.isLogin = false;
      store.loading = false;
      store.isRefreshing = true;
      store.error = null;
      store.newUser = {};
    },
    [logout.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    // * REFRESH
    [refresh.pending]: store => {
      store.loading = true;
      store.error = null;
      store.isRefreshing = true;
    },
    [refresh.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.sid = payload.sid;
      store.accessToken = payload.newAccessToken;
      store.refreshToken = payload.newRefreshToken;
      store.isRefreshing = false;
    },
    [refresh.rejected]: (store, { payload }) => {
      store.loading = false;
      store.isLogin = false;
      store.error = payload;
      store.isRefreshing = true;
    },
    // * GET USER
    [updateUser.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [updateUser.fulfilled]: (store, { payload }) => accessAuth(store, payload),
    [updateUser.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.data.message;
    },
    // * UPDATE USER
    [updateUserSettings.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [updateUserSettings.fulfilled]: (store, { payload }) => {
      store.isLogin = true;
      store.loading = false;
      store.secondName = payload.secondName;
      store.firstName = payload.firstName;
      store.surName = payload.surName;
      store.email = payload.email;
      store.tel = payload.tel;
      store.userAvatar = payload.userAvatar;
      store.cityName = payload.cityName;
      store.streetName = payload.streetName;
      store.houseNamber = payload.houseNamber;
      store.sex = payload.sex;
      store.about = payload.about;
    },
    [updateUserSettings.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

export default auth.reducer;
export const { clearNewUser, clearUser, clearError } = auth.actions;
