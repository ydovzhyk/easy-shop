import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserFeedback, selectUserReviews } from 'redux/review/review-selectors';
import { getUserFeedback, getUserReviews } from 'redux/review/review-operations';
import { getID } from 'redux/auth/auth-selectors';
import { clearReviewAndFeedback } from 'redux/review/review-slice';
import Avatar from 'components/Profile/Avatar/Avatar';
import StarsList from 'components/Shared/StarsList/StarsList';
import s from './MyReviews.module.scss';

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
  const review = currentSelector === 'seller' ? myFeedback : myReview;
  return (
    <div className={s.reviewsPageWrapper}>
      <div className={s.reviewsListWrapper}>
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
      {review.length === 0 && (
        <p className={s.message}>Тут поки нічого немає</p>
      )}
      <ul className={s.reviewsWrapper}>
        {review.map(
          ({ _id, reviewer, rating, reviewDate, products, feedback }) => {
            return (
              <li className={s.reviewBox} key={_id}>
                <div className={s.avatarBox}>
                  <Avatar src={reviewer.reviewerFoto} />
                </div>
                <div className={s.reviewWrapper}>
                  <div className={s.topReviewWrapper}>
                    <div>
                      <p className={s.reviewerName}>{reviewer.reviewerName}</p>
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
      </ul>
    </div>
  );
};

export default MyReviews;
