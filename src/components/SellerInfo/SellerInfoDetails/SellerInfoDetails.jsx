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
  // sellerInfo && console.log('sellerInfo in SellerInfoDetails', sellerInfo);
  const {
    userFeedback,
  } = sellerInfo;
  
  // console.log('sellerReviews in SellerInfoDetails', userReviews);
  
  // console.log('sellerFeedback in SellerInfoDetails', userFeedback);
  const [isMyWares, setIsMyWares] = useState(false);
  const [isMyFeedback, setIsMyFeedback] = useState(false);
  const [isAbout, setIsAbout] = useState(false);

  const valueforFeedback =  !userFeedback
    ? 0
    : userFeedback.length;
  
  useEffect(() => {
    setIsMyWares(
      location === `/member/${id}` || location === `/member/${id}/wares`
        ? true
        : false
    );
    setIsMyFeedback(
      location === `/member/${id}/feedback`
        ? true
        : false
    );
    setIsAbout(location === `/member/${id}/about`
      ? true
      : false);
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
  // console.log('isMyFeedback:', isMyFeedback);
  // console.log('isAbout:', isAbout);

  return (
    <Container>
      <ul className={s.list}>
        <li className={s.item}>
          <ProfileLink
            to="wares"
            addValue
            value={myWares}
            isBackgroundChange={isMyWares}
          >
            Мої товари
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink to="feedback"
            addValue
            value={valueforFeedback}
            isBackgroundChange={isMyFeedback}
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
