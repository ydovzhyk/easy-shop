import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  addReview,
  getUserFeedback,
  getUserReviews,
} from 'redux/review/review-operations';
import { selectUserFeedback, selectUserReviews } from 'redux/review/review-selectors';
import { getID } from 'redux/auth/auth-selectors';
import { updateUserFunc } from 'funcs&hooks/updateUser';

import { FiX } from 'react-icons/fi';
import Button from 'components/Shared/Button/Button';
import StarsList from 'components/Shared/StarsList/StarsList';
import ReviewList from '../ReviewList/ReviewList';
import s from 'components/Shared/FeedbackWindow/FeedbackWindow.module.scss';

const FeedbackWindow = ({
  hideWindow,
  orderToFeedbackWindow,
}) => {
  const dispatch = useDispatch();
  const sellerFeedback = useSelector(selectUserFeedback);
  const userId = useSelector(getID);
  const myReview = useSelector(selectUserReviews);
  const [rating, setRating] = useState(1);
  const { orderId, sellerId, productInfo } = orderToFeedbackWindow;
    
  const isBtnRewiewShown = myReview.find(it => it.orderId === orderId);
    
  useEffect(() => {
    dispatch(getUserFeedback({ sellerId }));
  }, [dispatch, sellerId]);

  const calculatedRating = `${Number(rating).toFixed(1)}`;

  const setFeedbackRating = number => setRating(number + 1);

  const filteredProducts = productInfo.map(product => {
    return { _id: product._id, nameProduct: product.nameProduct };
  });

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      rating: rating,
      feedback: '',
    },
  });

  const onSubmit = async (data, e) => {
    e.preventDefault();
    const feedbackData = {
      rating: rating,
      feedback: data.feedback,
      sellerId: sellerId,
      products: filteredProducts,
      orderId: orderId,
    };
    await dispatch(addReview(feedbackData));
    await dispatch(getUserFeedback({ sellerId }));
    dispatch(getUserReviews({ userId }));
    updateUserFunc(dispatch);
    reset();
  };

  return (
    <div className={s.windowBackdrop}>
      <div className={s.windowContainer}>
        <button className={s.closeButton} onClick={() => hideWindow()}>
          <FiX />
        </button>
        <p className={s.heading}>
          {isBtnRewiewShown ? 'Ви залишили відгук' : 'Залишити відгук'}
        </p>
        {!isBtnRewiewShown && (
          <form className={s.feedbackForm}>
            <div className={s.starsBox}>
              <StarsList
                rating={rating}
                size={32}
                setFeedbackRating={setFeedbackRating}
              />
              <p className={s.ratingNumber}>{calculatedRating}</p>
            </div>
            <p className={s.feedbackTitle}>Напишіть свій відгук:</p>
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
        )}

        {sellerFeedback.length > 0 && (
          <p className={s.feedbackTitle}>Відгуки інших користувачів:</p>
        )}

        <ReviewList review={sellerFeedback} />
      </div>
    </div>
  );
};

export default FeedbackWindow;
