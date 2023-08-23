export const calculateAverageRating = feedbackArray => {
  if (feedbackArray.length === 0) {
    return 0; // повертаємо 0, якщо масив порожній
  }

  const totalRating = feedbackArray.reduce(
    (sum, feedback) => sum + feedback.rating,
    0
  );
  const averageRating = totalRating / feedbackArray.length;

  return averageRating;
};
