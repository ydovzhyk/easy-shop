import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosAddProduct,
  axiosDeleteProduct,
  axiosGetAllProducts,
  axiosGetProductsByQuery,
} from 'api/product';

export const addProduct = createAsyncThunk(
  'product/add',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosAddProduct(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const deleteProduct = createAsyncThunk(
  'product/delete',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosDeleteProduct(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getAllProducts = createAsyncThunk(
  'product/',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosGetAllProducts();
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const searchProducts = createAsyncThunk(
  'product/search',
  async (query, { rejectWithValue, dispatch }) => {
    try {
      console.log(query);
      const { data } = await axiosGetProductsByQuery(`/product/search${query}`);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
