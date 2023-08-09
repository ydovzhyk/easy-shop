import { useEffect, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';
import { getOtherUser } from 'redux/otherUser/otherUser-operations';
// import { clearOtherUser } from 'redux/otherUser/otherUser.slice';
import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';

import ProfileInfo from 'components/Profile/ProfileInfo/ProfileInfo';
import SellerInfoDetails from 'components/SellerInfo/SellerInfoDetails/SellerInfoDetails';

import s from './SellerInfo.module.scss';

const SellerInfo = () => {
  const dispatch = useDispatch();
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const { id } = useParams();
  console.log('owner id in SellerInfo', id);
  useEffect(() => {
    // dispatch(clearOtherUser());
    dispatch(getOtherUser(id)).then(() => setIsDataLoaded(true));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, id]);
  const sellerInfo = useSelector(selectOtherUser);
console.log('sellerInfo in SellerInfo:', sellerInfo);
  
  const {
    userAvatar,
    username,
    cityName,
    dateCreate,
    lastVisit,
    sex,
    verify,
  } =
    sellerInfo;

  return (
    <>
      <section className={s.profileavatar}>
        {isDataLoaded && id &&
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
          isSubscriptionButton='true'
        // followersAmount={followersAmount}
        // salesAmount={salesAmount}
      />}
    </section>
    <section className={s.profiledetails}>
      <SellerInfoDetails/>
    </section>
    </>
  );
};

export default SellerInfo;
