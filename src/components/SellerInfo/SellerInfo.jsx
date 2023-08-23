import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOtherUser } from 'redux/otherUser/otherUser-operations';
import { updateUserSibscribes } from 'redux/auth/auth-operations';
// import { clearOtherUser } from 'redux/otherUser/otherUser.slice';
import { getLogin, getUserMessage, selectUserSubscriptions } from 'redux/auth/auth-selectors';
import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';

import ProfileInfo from 'components/Profile/ProfileInfo/ProfileInfo';
import SellerInfoDetails from 'components/SellerInfo/SellerInfoDetails/SellerInfoDetails';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import {calculateAverageRating} from 'funcs&hooks/calculateAverageRating';

import s from './SellerInfo.module.scss';

const SellerInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isMessage, setIsMessage] = useState('');
  const { id } = useParams();
  const isLogin = useSelector(getLogin);
  const userSubscriptions = useSelector(selectUserSubscriptions);
  // console.log('userSubscriptions in SellerInfo', userSubscriptions);
  // console.log('owner id in SellerInfo', id);
  const isSellerInSubscription = (userSubscriptions || [])
    .find(subscription => subscription === id);

  const sellerInfo = useSelector(selectOtherUser);
  const message = useSelector(getUserMessage);
  // console.log('owner id in SellerInfo', id);
  useEffect(() => {
    // dispatch(clearOtherUser());
    dispatch(getOtherUser(id)).then(() => setIsDataLoaded(true));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, id]);
  // console.log('sellerInfo in SellerInfo:', sellerInfo);
  // console.log('isSellerInSubscription in SellerInfo:', isSellerInSubscription);
  
  const {
    userAvatar,
    username,
    cityName,
    dateCreate,
    lastVisit,
    sex,
    verify,
    userFollowers,
    successfulSales,
    userFeedback,
  } = sellerInfo;
  
  console.log('userFeedback in SellerInfo:', userFeedback);
  const averageRating = calculateAverageRating(userFeedback); 
  const gradesAmount = userFeedback?.length || 0;
  useEffect(() => {
    setIsMessage(message);
  }, [message]);

  const resetMessage = () => {
    setIsMessage('');
  };


  const handleSubscribe = event => {
    event.preventDefault();
    if (!isLogin) {
      navigate('/login');
      return;
    }
    dispatch(updateUserSibscribes(id));
  };
  return (
    <>
      <section className={s.profileavatar}>
        {isDataLoaded && id && (
          <ProfileInfo
          userAvatar={userAvatar}
          userName={username}
          verify={verify}
          rating={averageRating}
          gradesAmount={gradesAmount}
          date={dateCreate}
          lastVisit={lastVisit}
          sex={sex || ''}
          cityName={cityName || 'Kyiv'}
          isSubscriptionButton={!isSellerInSubscription}
          onSubscribe={handleSubscribe}
          followersAmount={userFollowers?.length || 0}
          salesAmount={successfulSales}
      />)}
    </section>
    <section className={s.profiledetails}>
      <SellerInfoDetails/>
    </section>
      <section className={s.profiledetails}>
        <SellerInfoDetails />
      </section>
      {isMessage && (
        <MessageWindow text={`${message}`} onDismiss={resetMessage} />
      )}
    </>
  );
};

export default SellerInfo;
