import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosGetOtherUser,
  axiosUserSubscriptions,
  axiosDeleteUserSubscriptions,
  axiosSelectedSearches,
} from 'api/otherUser';

export const getOtherUser = createAsyncThunk(
  'other-user/',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosGetOtherUser(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const updateUserSubscriptions = createAsyncThunk(
  'other-user/subscriptions',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosUserSubscriptions(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const deleteUserSubscriptions = createAsyncThunk(
  'other-user/subscriptions/delete',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosDeleteUserSubscriptions(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const updateSelectedSearches = createAsyncThunk(
  'other-user/selected-searches',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosSelectedSearches(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);