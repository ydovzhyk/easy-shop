import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, getUserFeedback } from 'redux/review/review-operations';
import { selectUserFeedback } from 'redux/review/review-selectors';

import { FiX } from 'react-icons/fi';
import Button from 'components/Shared/Button/Button';
// import Avatar from 'components/Profile/Avatar/Avatar';
import StarsList from 'components/Shared/StarsList/StarsList';
import s from 'components/Shared/FeedbackWindow/FeedbackWindow.module.scss';
import ReviewList from '../ReviewList/ReviewList';


const FeedbackWindow = ({ hideWindow, orderId, sellerId, products }) => {
  const dispatch = useDispatch();
  const sellerFeedback = useSelector(selectUserFeedback);
    const [rating, setRating] = useState(1);
  
  useEffect(() => {
    dispatch(getUserFeedback({sellerId}));
  }, [dispatch, sellerId]);
  
  const calculatedRating = `${Number(rating).toFixed(1)}`;

  const setFeedbackRating = number => setRating(number + 1);
  
  const filteredProducts = products.map(product => {
    return { _id: product._id, nameProduct: product.nameProduct }
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
    console.log(feedbackData);
      await dispatch(addReview(feedbackData));
      dispatch(getUserFeedback({ sellerId }));
    reset();
    // hideWindow();
  };

  return (
    <div className={s.windowBackdrop}>
      <div className={s.windowContainer}>
        <button className={s.closeButton} onClick={hideWindow}>
          <FiX />
        </button>
        <form className={s.feedbackForm}>
          <p className={s.heading}>Залишити відгук</p>
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
        {sellerFeedback.length > 0 && (
          <p className={s.feedbackTitle}>Відгуки інших користувачів:</p>
        )}

        {/* <ul className={s.reviewsWrapper}>
          {sellerFeedback.map(
            ({ _id, reviewer, rating, reviewDate, products, feedback }) => {
              return (
                <li className={s.reviewBox} key={_id}>
                  <div className={s.avatarBox}>
                    <Avatar src={reviewer.reviewerFoto} />
                  </div>
                  <div className={s.reviewWrapper}>
                    <div className={s.topReviewWrapper}>
                      <div>
                        <p className={s.reviewerName}>
                          {reviewer.reviewerName}
                        </p>
                        <StarsList rating={rating} size={16} />
                      </div>
                      <p>{reviewDate}</p>
                    </div>
                    <ul className={s.productName}>
                      {products.map(product => (
                        <li key={product._id}>{product.nameProduct}</li>
                      ))}
                    </ul>
                    <p>{feedback}</p>
                  </div>
                </li>
              );
            }
          )}
        </ul> */}
        <ReviewList review={sellerFeedback} />
      </div>
    </div>
  );
};

export default FeedbackWindow;
