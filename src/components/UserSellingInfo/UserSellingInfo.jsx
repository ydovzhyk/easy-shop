import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams} from 'react-router-dom';
import { getOtherUser } from 'redux/otherUser/otherUser-operations';
import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';

import UserProfileInfo from 'components/Profile/UserProfileInfo/UserProfileInfo';
import SellerInfoDetails from 'components/UserSellingInfo/SellerInfoDetails/SellerInfoDetails';

import s from './UserSellingInfo.module.scss';

const UserSellingInfo = () => {
  const dispatch = useDispatch();
  
  const { id } = useParams();
  console.log('owner id in UserSellingInfo', id);
  useEffect(() => {
    dispatch(getOtherUser(id));
  }, [dispatch, id]);
  const userInfo = useSelector(selectOtherUser);
console.log('userInfo in UserSellingInfo:', userInfo);
  
  const {
    userAvatar,
    username,
    cityName,
    dateCreate,
    lastVisit,
    sex,
    verify,
  } =
    userInfo;

  return (
    <>
      <section className={s.profileavatar}>
        <UserProfileInfo
          userAvatar={userAvatar}
          userName={username}
          verify={verify}
          // rating={rating}
          // gradesAmount={gradesAmount}
          date={dateCreate}
          lastVisit={lastVisit}
          sex={sex || ''}
          cityName={cityName || 'Kyiv'}
          // followersAmount={followersAmount}
          // salesAmount={salesAmount}
        />
      </section>
      <section className={s.profiledetails}>
        <SellerInfoDetails/>
      </section>
    </>
  );
};

export default UserSellingInfo;
