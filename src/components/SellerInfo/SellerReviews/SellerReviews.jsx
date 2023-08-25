import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';

import { clearReviewAndFeedback } from 'redux/review/review-slice';
import {
  // deleteReviewById,
  getUserFeedback, getUserReviews
} from 'redux/review/review-operations';

import s from 'components/SellerInfo/SellerReviews/SellerReviews.module.scss';

const SellerReviews = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
    // const location = useLocation();
    // const owner = location.state?.owner ?? null;
  const isTablet = useMediaQuery({ minWidth: 768 });
  const [currentSelector, setcurrentSelector] = useState('seller');

  useEffect(() => {
        dispatch(clearReviewAndFeedback())
      if (currentSelector === 'seller') {
        dispatch(getUserFeedback({ sellerId: id}));
      }
      if (currentSelector === 'client') {
        dispatch(getUserReviews({ id }));
      }
    }, [dispatch, id, currentSelector]);

  const handleButtonClick = optionName => {
    setcurrentSelector(optionName);
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
              { value: 'seller', label: 'Як продавця' },
              { value: 'client', label: 'Як покупця' },
            ]}
            defaultValue={{ value: 'seller', label: 'Як продавця' }}
            theme={theme => ({
              ...theme,
              borderRadius: 0,
            })}
          />
          )}
          {isTablet && <ul className={s.optionsList}>
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
        </ul>}
        </div>
       </div>
    )
}

export default SellerReviews;