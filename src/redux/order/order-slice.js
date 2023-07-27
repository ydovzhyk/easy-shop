import { createSlice } from '@reduxjs/toolkit';

import {
  addOrder,
  updateOrder,
  getOrderById,
  getAllOrders,
  deleteOrderById,
  getUserOrders,
} from './order-operations';

const initialState = {
  message: '',
  loading: false,
  error: null,
  allOrders: [],
  orderInCheckout: {
    order: {},
    orderProductInfo: [],
  },
  orderById: {
    order: {},
    orderProductInfo: [],
  },
  userOrders: { orders: [], totalPages: null, totalUserOrders: null },
};

const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrderMessage: store => {
      store.message = '';
    },
    clearOrderError: store => {
      store.error = null;
    },
    clearOrders: store => {
      store.allOrders = [];
    },
    clearOrderById: store => {
      store.orderById = {};
    },
    clearOrderInCheckout: store => {
      store.orderInCheckout = [];
    },
  },
  extraReducers: {
    //* addOrder
    [addOrder.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [addOrder.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.message = payload.message;
      store.orderInCheckout = payload.newOrder;
      store.orderById = payload.newOrder;
    },
    [addOrder.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //* updateOrder
    [updateOrder.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [updateOrder.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.message = payload.message;
    },
    [updateOrder.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    // getOrderById
    [getOrderById.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getOrderById.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.orderById = payload;
    },
    [getOrderById.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.data.message;
    },
    //getAllOrders
    [getAllOrders.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getAllOrders.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.allOrders = payload;
    },
    [getAllOrders.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //* deleteOrderById
    [deleteOrderById.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [deleteOrderById.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.message = payload.message;
    },
    [deleteOrderById.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //* get user Orders
    [getUserOrders.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getUserOrders.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.userOrders.orders = payload.orders;
      store.userOrders.totalPages = payload.totalPages;
      store.userOrders.totalUserOrders = payload.totalUserOrders;
    },
    [getUserOrders.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

export default orders.reducer;

export const { clearOrderMessage, clearOrderError, clearOrders, clearOrderById } =
  orders.actions;
