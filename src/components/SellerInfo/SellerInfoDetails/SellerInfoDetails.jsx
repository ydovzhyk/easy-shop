import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useParams, Outlet } from 'react-router-dom';

import { selectOtherUser} from 'redux/otherUser/otherUser-selectors';
import Loader from 'components/Loader';
import Container from 'components/Shared/Container';
import ProfileLink from 'components/Profile/ProfileLink/ProfileLink';
import s from 'components/SellerInfo/SellerInfoDetails/SellerInfoDetails.module.scss';

const SellerInfoDetails = () => {
  const { id } = useParams();
  const [myWares, setMyWares] = useState(0);
  const location = useLocation().pathname;
    
    const sellerInfo = useSelector(selectOtherUser);
  sellerInfo && console.log('sellerInfo in SellerInfoDetails', sellerInfo);
  const {
    userReviews,
    userFeedback,
  } = sellerInfo;
  
  console.log('sellerReviews in SellerInfoDetails', userReviews);
  
  console.log('sellerFeedback in SellerInfoDetails', userFeedback);
  const [isMyWares, setIsMyWares] = useState(false);
  const [isMyReviews, setIsMyReviews] = useState(false);
  const [isAbout, setIsAbout] = useState(false);

  const valueforReview = !userReviews
    ? 0
    : userReviews.length + userFeedback.length;
  
  useEffect(() => {
    setIsMyWares(
      location === `/member/${id}` || location === `/member/${id}/mywares` ? true : false
    );
    setIsMyReviews(location === `/member/${id}/myreviews` ? true : false);
    setIsAbout(location === `/member/${id}/about` ? true : false);
  }, [location, id]);

  useEffect(() => {
    if (sellerInfo) {
      const sellerWares = sellerInfo?.userProducts || [];
      const sellerWaresLength = sellerWares.length;
      setMyWares(sellerWaresLength);
    } else {
      setMyWares(0);
    }
  }, [sellerInfo]);

  // console.log('isMyWares:', isMyWares);
  // console.log('isMyReviews:', isMyReviews);
  // console.log('isAbout:', isAbout);

  return (
    <Container>
      <ul className={s.list}>
        <li className={s.item}>
          <ProfileLink
            to="mywares"
            addValue
            value={myWares}
            isBackgroundChange={isMyWares}
          >
            Мої товари
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink to="myreviews"
            addValue
            value={valueforReview}
            isBackgroundChange={isMyReviews}
          >
            Мої відгуки
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink
            to="about"
            isBackgroundChange={isAbout}
          >
            Про мене
          </ProfileLink>
        </li>
      </ul>
    <Suspense fallback={<Loader />}>
        <Outlet />
    </Suspense>
  </Container>
  );
};

export default SellerInfoDetails;
