import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getUserReviews, updateFeedback } from 'redux/review/review-operations';
import { getID } from 'redux/auth/auth-selectors';
import { updateUserFunc } from 'funcs&hooks/updateUser';

import { FiX } from 'react-icons/fi';
import Button from 'components/Shared/Button/Button';
import StarsList from 'components/Shared/StarsList/StarsList';
import s from 'components/Shared/FeedbackWindow/FeedbackWindow.module.scss';

const EditFeedbackWindow = ({ hideWindow, reviewToFeedbackWindow }) => {
  const dispatch = useDispatch();
  const userId = useSelector(getID);
  const { rating, feedback, id } = reviewToFeedbackWindow;
  const [reviewRating, setReviewRating] = useState(rating);

  const calculatedRating = `${Number(reviewRating).toFixed(1)}`;

  const setFeedbackRating = number => setReviewRating(number + 1);

  const { control, handleSubmit, reset, register } = useForm({
    defaultValues: {
      rating: reviewRating,
      feedback: feedback,
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const feedbackData = {
      reviewId: id,
      rating: reviewRating,
      feedback: data.feedback,
    };
    console.log(feedbackData);
    await dispatch(updateFeedback(feedbackData));
    dispatch(getUserReviews({ userId }));
    updateUserFunc(dispatch);
    reset();
    hideWindow();
  };

  return (
    <div className={s.windowBackdrop}>
      <div className={s.windowContainer}>
        <button className={s.closeButton} onClick={() => hideWindow()}>
          <FiX />
        </button>
        <p className={s.heading}>Редагувати відгук</p>
        <form className={s.feedbackForm}>
          <div className={s.starsBox}>
            <StarsList
              rating={reviewRating}
              size={32}
              setFeedbackRating={setFeedbackRating}
            />
            <p className={s.ratingNumber}>{calculatedRating}</p>
          </div>
          <p className={s.feedbackTitle}>Редагуйте свій відгук:</p>
          <Controller
            control={control}
            name="feedback"
            // rules={{
            //   required: true,
            // }}
            render={({ field: { onChange, value } }) => (
              <textarea
                className={s.textarea}
                value={value}
                onChange={onChange}
                name="feedback"
                type="text"
                rows={4}
                cols={40}
                {...register('feedback', {
                  required: 'Напишіть відгук',
                })}
              />
            )}
          />
          <Button
            type="submit"
            btnClass="btnLight"
            text="Відправити відгук"
            handleClick={handleSubmit(onSubmit)}
          />
        </form>
      </div>
    </div>
  );
};

export default EditFeedbackWindow;
