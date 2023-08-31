import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { getLoadingReviews, selectUserFeedback, selectUserReviews } from 'redux/review/review-selectors';
import { deleteReviewById, getUserFeedback, getUserReviews } from 'redux/review/review-operations';
import { getID } from 'redux/auth/auth-selectors';
import { clearReviewAndFeedback } from 'redux/review/review-slice';

import Select from 'react-select';
import Avatar from 'components/Profile/Avatar/Avatar';
import StarsList from 'components/Shared/StarsList/StarsList';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import { BsTrash } from 'react-icons/bs';
import { updateUserFunc } from 'funcs&hooks/updateUser';
import s from './MyReviews.module.scss';

const MyReviews = () => {
    const dispatch = useDispatch();
    const userId = useSelector(getID)
    const myReview = useSelector(selectUserReviews);
    const myFeedback = useSelector(selectUserFeedback);
    const loading = useSelector(getLoadingReviews);
    const isTablet = useMediaQuery({ minWidth: 768 });
    
  const [currentSelector, setcurrentSelector] = useState('asSeller');
  console.log(currentSelector);

    useEffect(() => {
        dispatch(clearReviewAndFeedback())
      if (currentSelector === 'asSeller') {
        dispatch(getUserFeedback({ userId, feedbackType: 'asSeller' }));
      }
      if (currentSelector === 'asCustomer') {
        dispatch(getUserFeedback({ userId, feedbackType: 'asCustomer' }));
      }
      if (currentSelector === 'asUser') {
        dispatch(getUserReviews({ userId }));
      }
    }, [dispatch, userId, currentSelector]);
  const handleButtonClick = optionName => {
    setcurrentSelector(optionName);
  };
  const review = currentSelector === 'asUser' ? myReview : myFeedback;
  
  const handleButtonTrashClick = async id => {
    await dispatch(deleteReviewById(id));
    dispatch(getUserReviews({ userId }));
    updateUserFunc(dispatch);
  };

  return (
    <div className={s.reviewsPageWrapper}>
      <div className={s.reviewsListWrapper}>
        <p className={s.heading}>Відгуки</p>
        {!isTablet && (
          <Select
            classNamePrefix="custom-select"
            onChange={value => handleButtonClick(value.value)}
            options={[
              { value: 'asSeller', label: 'Як про продавця' },
              { value: 'asCustomer', label: 'Як про покупця' },
              { value: 'asUser', label: 'Мої відгуки' },
            ]}
            defaultValue={{ value: 'asSeller', label: 'Як про продавця' }}
            theme={theme => ({
              ...theme,
              borderRadius: 0,
            })}
          />
        )}
        {isTablet && (
          <ul className={s.optionsList}>
            <li>
              <button
                className={
                  currentSelector === 'asSeller'
                    ? `${s.selectButton} ${s.active}`
                    : s.selectButton
                }
                onClick={() => handleButtonClick('asSeller')}
              >
                Як про продавця
              </button>
            </li>
            <li>
              <button
                className={
                  currentSelector === 'asCustomer'
                    ? `${s.selectButton} ${s.active}`
                    : s.selectButton
                }
                onClick={() => handleButtonClick('asCustomer')}
              >
                Як про покупця
              </button>
            </li>
            <li>
              <button
                className={
                  currentSelector === 'asUser'
                    ? `${s.selectButton} ${s.active}`
                    : s.selectButton
                }
                onClick={() => handleButtonClick('asUser')}
              >
                Мої відгуки
              </button>
            </li>
          </ul>
        )}
      </div>
      {!loading && review.length === 0 && (
        <p className={s.message}>Тут поки нічого немає</p>
      )}
      {review.length > 0 && (
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
                    <p className={s.productFeedback}>{feedback}</p>
                  </div>
                  {currentSelector === 'asUser' && (
                    <div className={s.buttonTrashWrapper}>
                      <RoundButton
                        btnClass={isTablet ? 'roundButton' : 'roundButtonMob'}
                        icon={BsTrash}
                        handleClick={handleButtonTrashClick}
                        id={_id}
                      />
                    </div>
                  )}
                </li>
              );
            }
          )}
        </ul>
      )}
      
    </div>
  );
};

export default MyReviews;
