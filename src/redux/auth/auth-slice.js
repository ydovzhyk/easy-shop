import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  logout,
  refresh,
  updateUser,
} from './auth-opetations';

const initialState = {
  user: {
    email: '',
    id: '',
    userAvatar: '',
    orders: [],
    userAddress: '',
    userBasket: '',
    userLikes: '',
    username: '',
  },
  sid: '',
  accessToken: '',
  refreshToken: '',
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
    [updateUser.fulfilled]: (store, { payload }) => {
      store.isLogin = true;
      store.loading = false;
      store.user = payload;
    },
    [updateUser.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

export default auth.reducer;
export const { clearNewUser, clearUser, clearError } = auth.actions;
