import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosCreateDialogue,
  axiosGetDialogue,
  axiosGetDialoguesData,
  axiosDeleteDialogue,
} from 'api/dialogue';
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

export const getAllDialoguesData = createAsyncThunk(
  'dialogue/getData',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = await axiosGetDialoguesData(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const deleteDialogue = createAsyncThunk(
  'dialogue/gelete',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = await axiosDeleteDialogue(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
