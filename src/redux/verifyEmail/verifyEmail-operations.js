import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosVerifyEmail } from 'api/verify';

export const verifyEmail = createAsyncThunk(
  'verify/',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = await axiosVerifyEmail(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const verifyConfirmation = message => ({
  type: 'auth/verifyConfirmation',
  payload: { message },
});
