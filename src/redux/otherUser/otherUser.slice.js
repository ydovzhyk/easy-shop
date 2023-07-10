import { createSlice } from '@reduxjs/toolkit';

import { getOtherUser } from './otherUser-operations';

const initialState = {
  message: '',
  loading: false,
  error: null,
  otherUserInfo: {},
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
  },
});

export default otherUser.reducer;

export const { clearMessage, clearError, clearOtherUser } = otherUser.actions;
