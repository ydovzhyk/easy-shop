import { createSlice } from '@reduxjs/toolkit';

import { addProduct, deleteProduct } from './product-operations';

const initialState = {
  message: null,
  loading: false,
  error: null,
};

const products = createSlice({
  name: 'proucts',
  initialState,
  reducers: {
    clearMessage: store => {
      store.message = null;
    },
    clearError: store => {
      store.error = null;
    },
  },
  extraReducers: {
    //* addProduct
    [addProduct.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [addProduct.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.message = payload.message;
    },
    [addProduct.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //* deleteProduct
    [deleteProduct.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [deleteProduct.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.message = payload.message;
    },
    [deleteProduct.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

export default products.reducer;

export const { clearMessage, clearError } = products.actions;
