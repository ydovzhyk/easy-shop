import { createSlice } from '@reduxjs/toolkit';

import {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getUserProducts,
  searchProducts,
  getVipProducts,
  getProductsBySelector,
  getProductById,
  getProductsFromBasket,
  getProductsFromOtherUser,
} from './product-operations';

const initialState = {
  message: '',
  loading: false,
  error: '',
  allProducts: [],
  userProducts: [],
  userTotalProducts: null,
  userProductsTotalPages: null,
  productsByQuery: [],
  productsTotalByQuery: [],
  productsByQueryPages: 1,
  vipProducts: [],
  vipPages: 1,
  selectorProducts: [],
  selectorPages: 1,
  productById: {},
  productsFromBasket: [],
  sellersFromBasket: [],
  headerFormReset: false,
  headerFormClick: false,
  headerFormErrors: false,
  filterProduct: false,
  filterFormSubmit: false,
  shownFilterInMobile: false,
  currentProductsPage: 1,
  productsFromOtherUser: [],
};

const products = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearProductMessage: store => {
      store.message = '';
    },
    clearProductError: store => {
      store.error = null;
    },
    clearUserProducts: store => {
      store.userProducts = [];
    },
    clearProductById: store => {
      store.productById = {};
    },
    clearProductsFromBasket: store => {
      store.productsFromBasket = [];
    },
    resetHeaderForm: store => {
      store.headerFormReset = true;
    },
    notResetHeaderForm: store => {
      store.headerFormReset = false;
    },
    setHeaderFormClick: store => {
      store.headerFormClick = true;
    },
    resetHeaderFormClick: store => {
      store.headerFormClick = false;
    },
    showFilterInMobile: store => {
      store.shownFilterInMobile = true;
    },
    hideFilterInMobile: store => {
      store.shownFilterInMobile = false;
    },
    resetFilterProduct: store => {
      store.filterProduct = true;
    },
    showFilterProduct: store => {
      store.filterProduct = false;
    },
    submitFilterForm: store => {
      store.filterFormSubmit = true;
    },
    unSubmitFilterForm: store => {
      store.filterFormSubmit = false;
    },
    setHeaderFormErrors: store => {
      store.headerFormErrors = true;
    },
    clearHeaderFormErrors: store => {
      store.headerFormErrors = false;
    },
    clearSearchProducts: store => {
      store.productsByQuery = [];
    },
    clearTotalSearchProducts: store => {
      store.productsTotalByQuery = [];
    },
    setCurrentProductsPage: (store, { payload }) => {
      store.currentProductsPage = payload;
    },
    clearProductsFromOtherUser: store => {
      store.productsFromOtherUser = [];
    },
    clearProductsState: store => {
      store.message = '';
      store.loading = false;
      store.error = '';
      store.allProducts = [];
      store.userProducts = [];
      store.userTotalProducts = null;
      store.userProductsTotalPages = null;
      store.productsByQuery = [];
      store.productsTotalByQuery = [];
      store.productsByQueryPages = 1;
      store.vipProducts = [];
      store.vipPages = 1;
      store.selectorProducts = [];
      store.selectorPages = 1;
      store.productById = {};
      store.productsFromBasket = [];
      store.sellersFromBasket = [];
      store.headerFormReset = false;
      store.headerFormClick = false;
      store.headerFormErrors = false;
      store.filterProduct = false;
      store.filterFormSubmit = false;
      store.shownFilterInMobile = false;
      store.currentProductsPage = 1;
      store.productsFromOtherUser = [];
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
    },
    //* updateProduct
    [updateProduct.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [updateProduct.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.message = payload.message;
    },
    [updateProduct.rejected]: (store, { payload }) => {
      store.loading = false;
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
    },
    //* search Product
    [searchProducts.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [searchProducts.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.productsByQuery = payload.products;
      store.productsByQueryPages = payload.totalPages;
      store.productsTotalByQuery = payload.totalProducts;
    },
    [searchProducts.rejected]: (store, { payload }) => {
      store.loading = false;
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
    },
    // get products from user's basket
    [getProductsFromBasket.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getProductsFromBasket.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.productsFromBasket = payload.productsFromBasket;
      store.sellersFromBasket = payload.sellersFromBasket;
    },
    [getProductsFromBasket.rejected]: (store, { payload }) => {
      store.loading = false;
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
    },
    // get products from other user
    [getProductsFromOtherUser.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getProductsFromOtherUser.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.productsFromOtherUser = payload.productsFromOtherUser;
    },
    [getProductsFromOtherUser.rejected]: (store, { payload }) => {
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

export default products.reducer;

export const {
  clearProductMessage,
  clearProductError,
  clearUserProducts,
  clearProductById,
  clearProductsFromBasket,
  setHeaderFormErrors,
  clearHeaderFormErrors,
  resetHeaderForm,
  notResetHeaderForm,
  resetFilterProduct,
  showFilterProduct,
  clearSearchProducts,
  clearTotalSearchProducts,
  submitFilterForm,
  unSubmitFilterForm,
  showFilterInMobile,
  hideFilterInMobile,
  setHeaderFormClick,
  resetHeaderFormClick,
  setCurrentProductsPage,
  clearProductsFromOtherUser,
  clearProductsState,
} = products.actions;
