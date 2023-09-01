import { useEffect, useState } from 'react';
import { useParams, useSearchParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';

import { clearReviewAndFeedback } from 'redux/review/review-slice';
import {getUserFeedback} from 'redux/review/review-operations';
import { getLoadingReviews, selectUserFeedback} from 'redux/review/review-selectors';
import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';

import  ReviewList  from 'components/Shared/ReviewList/ReviewList';

import s from 'components/SellerInfo/SellerFeedback/SellerFeedback.module.scss';

const SellerFeedback = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const sellerInfo = useSelector(selectOtherUser);
  const { userFeedback } = sellerInfo;
  const asSellerFeedback = userFeedback.filter(
    ({ feedbackType }) => feedbackType === 'asCustomer'
  );
  const asCustomerFeedback = userFeedback.filter(
    ({ feedbackType }) => feedbackType === 'asSeller'
  );
  
  const sellerFeedback = useSelector(selectUserFeedback); 
  const loading = useSelector(getLoadingReviews);
  const isTablet = useMediaQuery({ minWidth: 768 });
  const [currentSelector, setcurrentSelector] = useState('asSeller');

  useEffect(() => {
    
    if (!searchParams.get('type')) {
      setSearchParams({ type: 'asSeller' });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    dispatch(clearReviewAndFeedback());
    const feedbackType = searchParams.get('type');
     if (feedbackType !== null)
    {dispatch(getUserFeedback({
      userId: id,
      feedbackType
      }));}
      }, [dispatch, id, searchParams]);


  const handleButtonClick = optionName => {
    setcurrentSelector(optionName);
    setSearchParams({ type: optionName });
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
              { value: 'asSeller', label: `Як про продавця ${asSellerFeedback.length}` },
              { value: 'asCustomer', label: `Як про покупця ${asCustomerFeedback.length}` },
            ]}
            defaultValue={{ value: 'asSeller', label: `Як про продавця ${asSellerFeedback.length}` }}
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
                    currentSelector === 'asSeller'
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
                    currentSelector === 'asCustomer'
                      ? `${s.selectButton} ${s.active}`
                      : s.selectButton
                  }
                  onClick={() => handleButtonClick('asCustomer')}
                >
                  Як про покупця {asCustomerFeedback.length}
                </button>
              
            </li>
        </ul>}
        </div>
        {!loading && sellerFeedback.length === 0 && (
        <p
        className={s.message}
        >
          Ще немає відгуків 
        </p>
        )}
        {sellerFeedback.length > 0 && (
          <div className={s.reviewsListBox}>
          <ReviewList
            review={sellerFeedback}
            />
            </div>
        )}
      </div>
    )
}

export default SellerFeedback;
