import { createSlice } from '@reduxjs/toolkit';
import {
  register,
  login,
  logout,
  updateUser,
  updateUserSettings,
  updateUserBasket,
  updateUserLikes,
  getUserLikesBasket,
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
    basketProducts: [],
    userLikes: [],
    likedProducts: [],
    // totalPagesLikedProducts: 0,
    username: null,
    newMessage: 0,
    userOrders: [],
    userSales: [],
  },
  sid: null,
  accessToken: null,
  refreshToken: null,
  isLogin: false,
  loading: false,
  isRefreshing: false,
  error: '',
  newUser: {},
  message: '',
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
    clearUserError: store => {
      store.error = '';
    },
    clearUserMessage: store => {
      store.message = null;
    },
    getUserWithDialogue: (store, action) => {
      store.user = action.payload;
    },
    getUpdatedUserNewMessage: (store, action) => {
      store.user = action.payload;
    },
  },

  extraReducers: {
    // * REGISTER
    [register.pending]: store => {
      store.loading = true;
      store.error = '';
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
      store.error = '';
    },
    [login.fulfilled]: (store, { payload }) => accessAuth(store, payload),
    [login.rejected]: (store, { payload }) => {
      store.loading = false;
      if (payload && payload.data) {
        store.error = payload.data.message;
      } else {
        store.error = payload.message;
      }
    },
    // * LOGOUT
    [logout.pending]: store => {
      store.loading = true;
      store.error = '';
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
      store.error = '';
      store.newUser = {};
    },
    [logout.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    // * GET USER
    [updateUser.pending]: store => {
      store.loading = true;
      store.isRefreshing = true;
      store.error = '';
    },
    [updateUser.fulfilled]: (store, { payload }) => {
      accessAuth(store, payload);
      store.isRefreshing = false;
    },
    [updateUser.rejected]: (store, { payload }) => {
      store.loading = false;
      store.isRefreshing = false;
      store.error = payload?.data?.message || '';
    },
    // * UPDATE USER SETTINGS
    [updateUserSettings.pending]: store => {
      store.loading = true;
      store.error = '';
    },
    [updateUserSettings.fulfilled]: (store, { payload }) => {
      store.isLogin = true;
      store.loading = false;
      store.user.secondName = payload.user.secondName;
      store.user.firstName = payload.user.firstName;
      store.user.surName = payload.user.surName;
      store.user.email = payload.user.email;
      store.user.tel = payload.user.tel;
      store.user.userAvatar = payload.user.userAvatar;
      store.user.cityName = payload.user.cityName;
      store.user.streetName = payload.user.streetName;
      store.user.houseNamber = payload.user.houseNamber;
      store.user.sex = payload.user.sex;
      store.user.about = payload.user.about;
      store.message = payload.message;
      store.newMessage = payload.newMessage;
    },
    [updateUserSettings.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    // * UPDATE USER BASKET
    [updateUserBasket.pending]: store => {
      store.loading = true;
      store.error = '';
    },
    [updateUserBasket.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.user.userBasket = payload.updatedUser.userBasket;
      store.user.basketProducts = payload.basketProducts;
    },

    [updateUserBasket.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.message;
    },
    // * UPDATE USER LIKES
    [updateUserLikes.pending]: store => {
      store.loading = true;
      store.error = '';
    },
    [updateUserLikes.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.user = payload.updatedUser;
      store.user.likedProducts = payload.likedProducts;
      // store.user.totalPagesLikedProducts = payload.totalPagesLikedProducts;
    },
    [updateUserLikes.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.message;
    },
    // * GET INFO BASKET & LIKES
    [getUserLikesBasket.pending]: store => {
      store.loading = true;
      store.error = '';
    },
    [getUserLikesBasket.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.user.likedProducts = payload.likedProducts;
      store.user.basketProducts = payload.basketProducts;
    },
    [getUserLikesBasket.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.message;
    },
  },
});

export default auth.reducer;
export const {
  clearNewUser,
  clearUser,
  clearUserError,
  clearUserMessage,
  getUserWithDialogue,
  getUpdatedUserNewMessage,
} = auth.actions;
