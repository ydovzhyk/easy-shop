export const getReviewsMessage = ({ reviews }) => reviews.message;
export const getReviewError = ({ reviews }) => reviews.error;
export const getLoadingReviews = ({ reviews }) => reviews.loading;

export const selectUserReviews = ({ reviews }) => reviews.userReviews;

export const selectReviewById = ({ reviews }) => reviews.reviewById;

export const selectUserFeedback = ({ reviews }) => reviews.userFeedback;