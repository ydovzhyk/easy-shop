import { createSlice } from '@reduxjs/toolkit';

import { verifyEmail } from './verifiEmail-operations';

const initialState = {
  loading: false,
  error: '',
  message: '',
  email: null,
};

const verifiEmailSlice = createSlice({
  name: 'verifiEmail',
  initialState,
  reducers: {
    setVerifiEmail: (store, action) => {
      store.email = action.payload;
    },
    verifyConfirmation: (store, action) => {
      store.message = action.payload;
    },
    clearVerifyError: store => {
      store.error = '';
    },
    clearVerifyMessage: store => {
      store.message = null;
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
      store.error = payload?.data?.message || '';
    },
  },
});

export default verifiEmailSlice.reducer;
export const {
  setVerifiEmail,
  verifyConfirmation,
  clearVerifyMessage,
  clearVerifyError,
} = verifiEmailSlice.actions;
