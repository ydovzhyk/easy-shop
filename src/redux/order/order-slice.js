import { createSlice } from '@reduxjs/toolkit';

import {
  addOrder,
  updateOrder,
  getOrderById,
  getAllOrders,
  deleteOrderById,
  getUserOrders,
  getUserSales,
} from './order-operations';

const initialState = {
  message: '',
  loading: false,
  error: '',
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
  userSales: { sales: [], totalPages: null, totalUserSales: null },
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
    clearOrderState: store => {
      store.message = '';
      store.error = '';
      store.allOrders = [];
      store.orderInCheckout = {
        order: {},
        orderProductInfo: [],
      };
      store.orderById = {
        order: {},
        orderProductInfo: [],
      };
      store.userOrders = {
        orders: [],
        totalPages: null,
        totalUserOrders: null,
      };
      store.userSales = { sales: [], totalPages: null, totalUserSales: null };
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
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
      if (payload && payload.data) {
        store.error =
          payload?.data?.message || 'Oops, something went wrong, try again';
      } else {
        store.error = payload.message;
      }
    },
    //* get user Sales
    [getUserSales.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getUserSales.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.userSales.sales = payload.sales;
      store.userSales.totalPages = payload.totalPages;
      store.userSales.totalUserSales = payload.totalUserSales;
    },
    [getUserSales.rejected]: (store, { payload }) => {
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

export default orders.reducer;

export const {
  clearOrderMessage,
  clearOrderError,
  clearOrders,
  clearOrderById,
  clearOrderState,
} = orders.actions;
