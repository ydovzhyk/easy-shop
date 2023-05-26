import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosLogin,
  axiosLogout,
  axiosRegister,
  axiosRefresh,
  axiosUpdateUser,
} from 'api/auth';

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
  async (newAccessToken, { rejectWithValue, getState, dispatch }) => {
    try {
      if (!newAccessToken) {
        const { auth } = getState();
        const data = await axiosUpdateUser(auth.accessToken);
        return data;
      } else {
        const data = await axiosUpdateUser(newAccessToken);
        return data;
      }
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const refresh = createAsyncThunk(
  'auth/refresh',
  async (userInfo, { rejectWithValue, getState, dispatch }) => {
    try {
      const { auth } = getState();
      let sid = auth.sid;
      let refreshToken = auth.refreshToken;

      if (!sid || !refreshToken) {
        sid = userInfo.sid;
        refreshToken = userInfo.refreshToken;
      }
      const data = await axiosRefresh(sid, refreshToken);
      if (auth.sid) {
        dispatch(updateUser(data.newAccessToken));
      }
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);
