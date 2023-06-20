import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosGetOtherUser } from 'api/otherUser';

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
