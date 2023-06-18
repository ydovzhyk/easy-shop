import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosAddProduct,
  axiosDeleteProduct,
  axiosGetAllProducts,
  axiosGetUserProducts,
  axiosGetProductsByQuery,
  axiosGetVipProducts,
  axiosGetNewProducts,
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
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosGetUserProducts(userData);
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
      const data = await axiosGetProductsByQuery(searchQuery);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getVipProducts = createAsyncThunk(
  'product/vip',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosGetVipProducts(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);


// export const getNewProducts = createAsyncThunk(
//   'product/new',
//   async (userData, { rejectWithValue, dispatch }) => {
//     try {
//       const data = await axiosGetNewProducts(userData);
//       return data;
//     } catch (error) {
//       const { data, status } = error.response;
//       return rejectWithValue({ data, status });
//     }
//   }
// );