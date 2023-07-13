import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosCreateDialogue, axiosGetDialogue } from 'api/dialogue';
import { getUserWithDialogue } from '../auth/auth-slice';

export const createDialogue = createAsyncThunk(
  'dialogue/create',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = await axiosCreateDialogue(userData);
      dispatch(getUserWithDialogue(data.user));
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getDialogue = createAsyncThunk(
  'dialogue/get',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = await axiosGetDialogue(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
