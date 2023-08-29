import { useEffect, useState, Suspense } from 'react';
import { useParams, Link, Outlet, useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';

import { clearReviewAndFeedback } from 'redux/review/review-slice';
import {
  // deleteReviewById,
  getUserFeedback, getUserReviews
} from 'redux/review/review-operations';

import Loader from 'components/Loader';

import s from 'components/SellerInfo/SellerReviews/SellerReviews.module.scss';

const SellerReviews = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
    // const location = useLocation();
    // const owner = location.state?.owner ?? null;
  const isTablet = useMediaQuery({ minWidth: 768 });
  const [currentSelector, setcurrentSelector] = useState('aboutseller');

  useEffect(() => {
        dispatch(clearReviewAndFeedback())
      if (currentSelector === 'aboutseller') {
        dispatch(getUserFeedback({ sellerId: id }));
        navigate("aboutseller");
      }
      if (currentSelector === 'aboutbuyer') {
        dispatch(getUserReviews({ id }));
        navigate("aboutbuyer");
      }
    }, [dispatch, id, currentSelector, navigate]);

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
              { value: 'aboutseller', label: 'Як про продавця' },
              { value: 'aboutbuyer', label: 'Як про покупця' },
            ]}
            defaultValue={{ value: 'aboutseller', label: 'Як про продавця' }}
            theme={theme => ({
              ...theme,
              borderRadius: 0,
            })}
          />
          )}
          {isTablet && <ul className={s.optionsList}>
            <li>
              <Link to="aboutseller">
                <button
                  className={
                    currentSelector === 'aboutseller'
                      ? `${s.selectButton} ${s.active}`
                      : s.selectButton
                  }
                  onClick={() => handleButtonClick('aboutseller')}
                >
                  Як про продавця
                </button>
              </Link>
            
            </li>
            <li>
              <Link to="aboutbuyer">
                <button
                  className={
                    currentSelector === 'aboutbuyer'
                      ? `${s.selectButton} ${s.active}`
                      : s.selectButton
                  }
                  onClick={() => handleButtonClick('aboutbuyer')}
                >
                  Як про покупця
                </button>
              </Link>  
            </li>
        </ul>}
        </div>
        <Suspense fallback={<Loader />}>
        <Outlet />
    </Suspense>
      </div>
    )
}

export default SellerReviews;
