import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  axiosAddReview,
  axiosGetReviewById,
  axiosDeleteReviewById,
  axiosGetUserReviews,
  axiosGetUserFeedback,
} from 'api/review';

export const addReview = createAsyncThunk(
  'reviews/add',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosAddReview(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getReviewById = createAsyncThunk(
  'reviews/:id',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      // console.log(userData);
      const data = await axiosGetReviewById(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const deleteReviewById = createAsyncThunk(
  'reviews/delete',
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosDeleteReviewById(userData);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getUserReviews = createAsyncThunk(
  'reviews/user-reviews',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosGetUserReviews();
      // console.log(data);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);

export const getUserFeedback = createAsyncThunk(
  'reviews/user-feedback',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const data = await axiosGetUserFeedback();
      // console.log(data);
      return data;
    } catch (error) {
      const { data, status } = error.response;
      return rejectWithValue({ data, status });
    }
  }
);