import { createSlice } from '@reduxjs/toolkit';

import {
  addReview,
  getReviewById,
  deleteReviewById,
  getUserReviews,
  getUserFeedback,
} from './review-operations.js';

const initialState = {
  message: '',
  loading: false,
  error: null,
  reviewById: {},
  userReviews: [],
  userFeedback: [],
};

const reviews = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    clearReviewMessage: store => {
      store.message = '';
    },
    clearReviewError: store => {
      store.error = null;
    },
    clearReviewById: store => {
      store.orderById = {};
    },
    clearReviewAndFeedback: store => {
      store.userReviews = [];
      store.userFeedback = [];
    },
  },
  extraReducers: {
    //* addOrder
    [addReview.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [addReview.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.message = payload.message;
    },
    [addReview.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    // getReviewById
    [getReviewById.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getReviewById.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.reviewById = payload;
    },
    [getReviewById.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload.data.message;
    },
    //* deleteReviewById
    [deleteReviewById.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [deleteReviewById.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.message = payload.message;
    },
    [deleteReviewById.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //* get user Reviews
    [getUserReviews.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getUserReviews.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.userReviews = payload.reviews;
    },
    [getUserReviews.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
    //* get user Feedback
    [getUserFeedback.pending]: store => {
      store.loading = true;
      store.error = null;
    },
    [getUserFeedback.fulfilled]: (store, { payload }) => {
      store.loading = false;
      store.userFeedback = payload.feedback;
    },
    [getUserFeedback.rejected]: (store, { payload }) => {
      store.loading = false;
      store.error = payload;
    },
  },
});

export default reviews.reducer;

export const {
  clearReviewMessage,
  clearReviewError,
  clearReviewById,
  clearReviewAndFeedback,
} = reviews.actions;
