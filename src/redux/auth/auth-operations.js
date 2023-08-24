import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosLogin,
  axiosLogout,
  axiosRegister,
  axiosUpdateUser,
  axiosUpdateUserBasket,
  axiosUpdateUserLikes,
  axiosUserLikesBasket,
  axiosUpdateUserSubscribes,
  axiosUpdateSearchUserSibscribes,
} from 'api/auth';

// import axios from 'axios';
import { axiosUpdateUserSettings } from 'api/updateUser';

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosRegister(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await axiosLogin(userData);
      const { accessToken, refreshToken, sid } = data;
      const authData = { accessToken, refreshToken, sid };
      localStorage.setItem('easy-shop.authData', JSON.stringify(authData));
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue, getState }) => {
    try {
      const {
        auth: { accessToken },
      } = getState();
      const data = await axiosLogout(accessToken);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const updateUser = createAsyncThunk(
  'auth/current',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosUpdateUser(userData.accessToken, userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const updateUserSettings = createAsyncThunk(
  'auth/current/settings',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = await axiosUpdateUserSettings(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const googleUpdate = (accessToken, refreshToken, sid) => ({
  type: 'auth/googleUpdate',
  payload: { accessToken, refreshToken, sid },
});

export const updateUserBasket = createAsyncThunk(
  'auth/basket',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = await axiosUpdateUserBasket(userData);
      // console.log('return data from updateUserBasket', data);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const updateUserLikes = createAsyncThunk(
  'auth/likes',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = await axiosUpdateUserLikes(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getUserLikesBasket = createAsyncThunk(
  'auth/info',
  async (userData, { rejectWithValue, getState, dispatch }) => {
    try {
      const data = await axiosUserLikesBasket(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const updateUserSibscribes = createAsyncThunk(
  'auth/subscribes',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosUpdateUserSubscribes(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const updateSearchUserSibscribes = createAsyncThunk(
  'auth/subscribes/search',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosUpdateSearchUserSibscribes(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
