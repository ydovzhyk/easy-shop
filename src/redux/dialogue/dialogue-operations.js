import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosCreateDialogue,
  axiosGetDialogue,
  axiosGetDialoguesData,
  axiosDeleteDialogue,
  axiosDeleteDialogueNewMessage,
  axiosOrderConfirmationDialogue,
} from 'api/dialogue';
import {
  getUserWithDialogue,
  getUpdatedUserNewMessage,
} from '../auth/auth-slice';

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
  'dialogue/delete',
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

export const deleteDialogueNewMessage = createAsyncThunk(
  'dialogue/deleteNewMessage',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const {
        dialogue: { statusDialogueList },
      } = getState();

      const data = await axiosDeleteDialogueNewMessage(userData);
      dispatch(getUpdatedUserNewMessage(data.user));
      const statusDialogue = statusDialogueList;
      dispatch(getAllDialoguesData({ statusDialogue }));
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const orderConfirmationDialogue = createAsyncThunk(
  'dialogue/order',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = await axiosOrderConfirmationDialogue(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
