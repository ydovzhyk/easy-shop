import { createSlice } from '@reduxjs/toolkit';

import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getUserProducts,
  searchProducts,
  getVipProducts,
  getProductsBySelector,
  getProductById,
} from './product-operations';

const initialState = {
  message: '',
  loading: false,
  error: null,
  allProducts: [],
  userProducts: [],
  userTotalProducts: null,
  userProductsTotalPages: null,
  productsByQuery: [],
  vipProducts: [],
  vipPages: 1,
  selectorProducts: [],
  selectorPages: 1,
  productById: {},
};

const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearMessage: store => {
      store.message = '';
    },
    clearError: store => {
      store.error = null;
    },
    clearUserProducts: store => {
      store.userProducts = [];
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
    [getAllProducts.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getAllProducts.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.allProducts = payload;
    },
    [getAllProducts.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //* search Product
    [searchProducts.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [searchProducts.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.productsByQuery = payload;
    },
    [searchProducts.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //* get my product
    [getUserProducts.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getUserProducts.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.userProducts = [...store.userProducts, ...payload.products];
      store.userTotalProducts = payload.totalUserPoducts;
      store.userProductsTotalPages = payload.totalPages;
    },
    [getUserProducts.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //get products page
    [getVipProducts.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getVipProducts.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.vipProducts = payload.products;
      store.vipPages = payload.totalPages;
    },
    [getVipProducts.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //  get SelectorProducts page
    [getProductsBySelector.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getProductsBySelector.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.selectorProducts = payload.products;
      store.selectorPages = payload.totalPages;
    },
    [getProductsBySelector.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    // getProductById
    [getProductById.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getProductById.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.productById = payload;
    },
    [getProductById.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

export default products.reducer;

export const { clearMessage, clearError, clearUserProducts } = products.actions;
