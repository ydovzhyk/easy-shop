import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosAddOrder,
  axiosUpdateOrder,
  axiosGetAllOrders,
  axiosGetOrderById,
  axiosDeleteOrderById,
  axiosGetUserOrders,
  axiosGetUserSales,
  axiosUpdateOrderStatus,
} from 'api/order';

export const addOrder = createAsyncThunk(
  'orders/add',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosAddOrder(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const updateOrder = createAsyncThunk(
  'orders/update',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosUpdateOrder(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getAllOrders = createAsyncThunk(
  'orders/getAllOrders',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosGetAllOrders();
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getOrderById = createAsyncThunk(
  'orders/:id',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosGetOrderById(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const deleteOrderById = createAsyncThunk(
  'orders/delete',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosDeleteOrderById(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getUserOrders = createAsyncThunk(
  'orders/user-orders',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosGetUserOrders(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getUserSales = createAsyncThunk(
  'orders/user-sales',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosGetUserSales(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  'orders/confirmation',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosUpdateOrderStatus(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
