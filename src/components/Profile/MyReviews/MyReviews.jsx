import { useEffect, useState } from 'react';
// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { getLoadingReviews, selectUserFeedback, selectUserReviews } from 'redux/review/review-selectors';
import { getUserFeedback, getUserReviews } from 'redux/review/review-operations';
import { getID, selectFeedback, selectReviews } from 'redux/auth/auth-selectors';
import { clearReviewAndFeedback } from 'redux/review/review-slice';

import Select from 'react-select';
import Avatar from 'components/Profile/Avatar/Avatar';
import StarsList from 'components/Shared/StarsList/StarsList';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import { BsPencil } from 'react-icons/bs';
// import { updateUserFunc } from 'funcs&hooks/updateUser';
import s from './MyReviews.module.scss';
import EditFeedbackWindow from 'components/Shared/EditFeedbackWindow/EditFeedbackWindow';

const MyReviews = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getID)
  const myReview = useSelector(selectUserReviews);
  const myFeedback = useSelector(selectUserFeedback);
  const loading = useSelector(getLoadingReviews);
  const isTablet = useMediaQuery({ minWidth: 768 });
  const userReviews = useSelector(selectReviews);
  const userFeedback = useSelector(selectFeedback);
  const asSellerFeedback = userFeedback.filter(
    ({ feedbackType }) => feedbackType === 'asCustomer'
  );
  const asCustomerFeedback = userFeedback.filter(
    ({ feedbackType }) => feedbackType === 'asSeller'
  );
    
  // const [currentSelector, setСurrentSelector] = useState('asSeller');
  // console.log(currentSelector);
  const [isEditFeedbackWindowOpen, setIsEditFeedbackWindowOpen] = useState(false);
  const [reviewToFeedbackWindow, setReviewToFeedbackWindow] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams);
  const feedbackTypeParams = searchParams.get('type');
  // console.log(feedbackTypeParams);

    useEffect(() => {
      dispatch(clearReviewAndFeedback());
      if (feedbackTypeParams === 'asSeller') {
        dispatch(getUserFeedback({ userId, feedbackType: 'asSeller' }));
      }
      if (feedbackTypeParams === 'asCustomer') {
        dispatch(getUserFeedback({ userId, feedbackType: 'asCustomer' }));
      }
      if (feedbackTypeParams === 'asUser') {
        dispatch(getUserReviews({ userId }));
      }
    }, [dispatch, userId, feedbackTypeParams]);
  const handleButtonClick = optionName => {
    // setСurrentSelector(optionName);
    setSearchParams({ type: optionName });
  };
  const review = feedbackTypeParams === 'asUser' ? myReview : myFeedback;
  
  // const handleButtonTrashClick = async id => {
  //   await dispatch(deleteReviewById(id));
  //   dispatch(getUserReviews({ userId }));
  //   updateUserFunc(dispatch);
  // };

  const toggleIsOpen = (id, rating, feedback) => {
    if (id) {
      setReviewToFeedbackWindow({ id, rating, feedback });
      setIsEditFeedbackWindowOpen(!isEditFeedbackWindowOpen);
      return;
    }
    setReviewToFeedbackWindow({});
    setIsEditFeedbackWindowOpen(!isEditFeedbackWindowOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isEditFeedbackWindowOpen ? 'hidden' : 'unset';
  }, [isEditFeedbackWindowOpen]);

  return (
    <div className={s.reviewsPageWrapper}>
      <div className={s.reviewsListWrapper}>
        <p className={s.heading}>Відгуки</p>
        {!isTablet && (
          <Select
            classNamePrefix="custom-select"
            onChange={value => handleButtonClick(value.value)}
            options={[
              {
                value: 'asSeller',
                label: `Як про продавця ${asSellerFeedback.length}`,
              },
              {
                value: 'asCustomer',
                label: `Як про покупця ${asCustomerFeedback.length}`,
              },
              { value: 'asUser', label: `Мої відгуки ${userReviews.length}` },
            ]}
            defaultValue={{
              value: 'asSeller',
              label: `Як про продавця ${asSellerFeedback.length}`,
            }}
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
                  feedbackTypeParams === 'asSeller'
                    ? `${s.selectButton} ${s.active}`
                    : s.selectButton
                }
                onClick={() => handleButtonClick('asSeller')}
              >
                Як про продавця {asSellerFeedback.length}
              </button>
            </li>
            <li>
              <button
                className={
                  feedbackTypeParams === 'asCustomer'
                    ? `${s.selectButton} ${s.active}`
                    : s.selectButton
                }
                onClick={() => handleButtonClick('asCustomer')}
              >
                Як про покупця {asCustomerFeedback.length}
              </button>
            </li>
            <li>
              <button
                className={
                  feedbackTypeParams === 'asUser'
                    ? `${s.selectButton} ${s.active}`
                    : s.selectButton
                }
                onClick={() => handleButtonClick('asUser')}
              >
                Мої відгуки {userReviews.length}
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
                  {feedbackTypeParams === 'asUser' && (
                    <div className={s.buttonTrashWrapper}>
                      {/* <RoundButton
                        btnClass={isTablet ? 'roundButton' : 'roundButtonMob'}
                        icon={BsTrash}
                        handleClick={handleButtonTrashClick}
                        id={_id}
                      /> */}
                      <RoundButton
                        btnClass={isTablet ? 'roundButton' : 'roundButtonMob'}
                        icon={BsPencil}
                        handleClick={() => toggleIsOpen(_id, rating, feedback)}
                        id={_id}
                      />
                    </div>
                  )}
                  {isEditFeedbackWindowOpen && (
                    <EditFeedbackWindow
                      hideWindow={toggleIsOpen}
                      reviewToFeedbackWindow={reviewToFeedbackWindow}
                    />
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
