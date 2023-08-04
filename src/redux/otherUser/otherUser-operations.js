import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGetOtherUser, axiosUserSubscriptions } from 'api/otherUser';

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
  async (_, { rejectWithValue }) => {
    try {
      const data = await axiosUserSubscriptions();
      console.log('data', data);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
