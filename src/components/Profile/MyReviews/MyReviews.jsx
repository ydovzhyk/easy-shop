import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './MyReviews.module.scss';
import { selectUserFeedback, selectUserReviews } from 'redux/review/review-selectors';
import { getUserFeedback, getUserReviews } from 'redux/review/review-operations';
import { getID } from 'redux/auth/auth-selectors';
import { clearReviewAndFeedback } from 'redux/review/review-slice';

const MyReviews = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getID)
    const myReview = useSelector(selectUserReviews);
    const myFeedback = useSelector(selectUserFeedback);
    console.log(myReview, myFeedback);
    const [currentSelector, setcurrentSelector] = useState('seller');
    useEffect(() => {
        dispatch(clearReviewAndFeedback())
      if (currentSelector === 'seller') {
        dispatch(getUserFeedback({ sellerId: userId }));
      }
      if (currentSelector === 'client') {
        dispatch(getUserReviews({ userId }));
      }
    }, [dispatch, userId, currentSelector]);
  const handleButtonClick = optionName => {
    setcurrentSelector(optionName);
  };
  return (
    <div className={s.reviewsWrapper}>
      <p className={s.heading}>Відгуки</p>
      <ul className={s.optionsList}>
        <li>
          <button
            className={
              currentSelector === 'seller'
                ? `${s.selectButton} ${s.active}`
                : s.selectButton
            }
            onClick={() => handleButtonClick('seller')}
          >
            Як продавця
          </button>
        </li>
        <li>
          <button
            className={
              currentSelector === 'client'
                ? `${s.selectButton} ${s.active}`
                : s.selectButton
            }
            onClick={() => handleButtonClick('client')}
          >
            Як покупця
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MyReviews;
