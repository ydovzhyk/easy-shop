import instance from './auth';

// Create new review
export const axiosAddReview = async userData => {
  const { data } = await instance.post('/reviews/add', userData);
  return data;
};

// Get review by Id
export const axiosGetReviewById = async id => {
  const { data } = await instance.get(`/reviews/${id}`);
  return data;
};

// Delete reviewby Id
export const axiosDeleteReviewById = async id => {
  const { data } = await instance.delete(`/reviews/delete/${id}`);
  return data;
};

// Get User reviews
export const axiosGetUserReviews = async () => {
  const { data } = await instance.post(
    `/reviews/user-reviews`
  );
  return data;
};

// Get User feedback
export const axiosGetUserFeedback = async userData => {
  const { data } = await instance.post(`/reviews/user-feedback`, userData);
  return data;
};