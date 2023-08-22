import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getOtherUser } from 'redux/otherUser/otherUser-operations';
import { updateUserSibscribes } from 'redux/auth/auth-operations';
// import { clearOtherUser } from 'redux/otherUser/otherUser.slice';
import { getLogin, getUserMessage } from 'redux/auth/auth-selectors';
import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';

import ProfileInfo from 'components/Profile/ProfileInfo/ProfileInfo';
import SellerInfoDetails from 'components/SellerInfo/SellerInfoDetails/SellerInfoDetails';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';

import s from './SellerInfo.module.scss';

const SellerInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isMessage, setIsMessage] = useState('');
  const { id } = useParams();
  const isLogin = useSelector(getLogin);
  const sellerInfo = useSelector(selectOtherUser);
  const message = useSelector(getUserMessage);
  // console.log('owner id in SellerInfo', id);
  useEffect(() => {
    // dispatch(clearOtherUser());
    dispatch(getOtherUser(id)).then(() => setIsDataLoaded(true));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, id]);

  // console.log('sellerInfo in SellerInfo:', sellerInfo);

  useEffect(() => {
    setIsMessage(message);
  }, [message]);

  const resetMessage = () => {
    setIsMessage('');
  };

  const { userAvatar, username, cityName, dateCreate, lastVisit, sex, verify } =
    sellerInfo;

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
            // rating={rating}
            // gradesAmount={gradesAmount}
            date={dateCreate}
            lastVisit={lastVisit}
            sex={sex || ''}
            cityName={cityName || 'Kyiv'}
            isSubscriptionButton="true"
            onSubscribe={handleSubscribe}
            // followersAmount={followersAmount}
            // salesAmount={salesAmount}
          />
        )}
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
