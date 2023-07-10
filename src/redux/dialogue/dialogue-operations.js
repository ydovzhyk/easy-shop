import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosCreateDialogue } from 'api/dialogue';

export const createDialogue = createAsyncThunk(
  'dialogue/create',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = await axiosCreateDialogue(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
