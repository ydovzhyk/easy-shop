import { createSlice } from '@reduxjs/toolkit';

import {
  getOtherUser,
  updateUserSubscriptions,
  deleteUserSubscriptions,
  updateSelectedSearches,
} from './otherUser-operations';

const initialState = {
  message: '',
  loading: false,
  error: '',
  otherUserInfo: {},
  userSubscriptions: [],
  totalPagesSubscription: 1,
  userFollowers: [],
  selectedSearches: [],
  totalPagesSelectedSearches: 1,
};

const otherUser = createSlice({
  name: 'otherUser',
  initialState,
  reducers: {
    clearMessage: store => {
      store.message = '';
    },
    clearError: store => {
      store.error = null;
    },
    clearOtherUser: store => {
      store.otherUserInfo = {};
    },
    clearOtherUserState: store => {
      store.message = '';
      store.error = '';
      store.otherUserInfo = {};
      store.userSubscriptions = [];
      store.totalPagesSubscription = 1;
      store.userFollowers = [];
      store.selectedSearches = [];
      store.totalPagesSelectedSearches = 1;
    },
  },
  extraReducers: {
    // Get info by Other User
    [getOtherUser.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getOtherUser.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.otherUserInfo = payload;
    },
    [getOtherUser.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.message;
    },
    // * POST User Subscriptions
    [updateUserSubscriptions.pending]: store => {
      store.loading = true;
      store.error = '';
    },
    [updateUserSubscriptions.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.userSubscriptions = payload.userSubscriptions;
      store.totalPagesSubscription = payload.totalPagesUserSubscription;
    },
    [updateUserSubscriptions.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.message;
    },

    // * Delete User Subscriptions
    [deleteUserSubscriptions.pending]: store => {
      store.loading = true;
      store.error = '';
    },
    [deleteUserSubscriptions.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.userSubscriptions = payload.userSubscriptions;
      store.totalPagesSubscription = payload.totalPagesUserSubscription;
    },
    [deleteUserSubscriptions.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.message;
    },

    // * POST Selecte Searches
    [updateSelectedSearches.pending]: store => {
      store.loading = true;
      store.error = '';
    },
    [updateSelectedSearches.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.selectedSearches = payload.selectedSearches;
      store.totalPagesSelectedSearches = payload.totalPagesSelectedSearches;
    },
    [updateSelectedSearches.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.message;
    },
  },
});

export default otherUser.reducer;

export const { clearMessage, clearError, clearOtherUser, clearOtherUserState } =
  otherUser.actions;
