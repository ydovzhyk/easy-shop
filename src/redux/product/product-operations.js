import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosAddProduct,
  axiosDeleteProduct,
  axiosGetAllProducts,
  axiosGetUserProducts,
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

export const getUserProducts = createAsyncThunk(
  'product/user-products',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosGetUserProducts();
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const searchProducts = createAsyncThunk(
  'products/search',
  async (searchQuery, { rejectWithValue, dispatch }) => {
    try {
      console.log(searchQuery);
      const data = await axiosGetProductsByQuery(searchQuery);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
