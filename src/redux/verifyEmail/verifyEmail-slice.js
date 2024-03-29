import { createSlice } from '@reduxjs/toolkit';

import { verifyEmail } from './verifyEmail-operations';

const initialState = {
  loading: false,
  error: '',
  message: '',
  email: null,
};

const verifyEmailSlice = createSlice({
  name: 'verifyEmail',
  initialState,
  reducers: {
    setVerifyEmail: (store, action) => {
      store.email = action.payload;
    },
    verifyConfirmation: (store, action) => {
      store.message = action.payload;
    },
    clearVerifyError: store => {
      store.error = '';
    },
    clearVerifyMessage: store => {
      store.message = '';
    },
    clearVerifyState: store => {
      store.message = '';
      store.error = '';
      store.email = null;
    },
  },

  extraReducers: {
    // * GET VERIFICATION EMAIL
    [verifyEmail.pending]: store => {
      store.loading = true;
      store.error = '';
      store.message = '';
    },
    [verifyEmail.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.message = payload.message;
    },
    [verifyEmail.rejected]: (store, { payload }) => {
      store.loading = false;
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
    },
  },
});

export default verifyEmailSlice.reducer;
export const {
  setVerifyEmail,
  verifyConfirmation,
  clearVerifyMessage,
  clearVerifyError,
  clearVerifyState,
} = verifyEmailSlice.actions;
