import {
  BsCheck2,
  BsGeoAlt,
  BsHandbag,
  BsPeople,
  BsClock,
} from 'react-icons/bs';
import Avatar from 'components/Profile/Avatar/Avatar';
import UserRating from 'components/Profile/UserProfileInfo/UserRating';
import Value from 'components/Profile/Value';
import DaysValue from 'components/Profile/UserProfileInfo/DaysValue';
import s from './SellerInfo.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getOtherUser } from 'redux/otherUser/otherUser-operations';
import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';

const getDaysPassedFromDate = dateString => {
  const date = new Date(dateString);
  const currentDate = new Date();
  const deltaTime = currentDate - date;
  const daysPassed = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
  return daysPassed;
};

const getTimePassedFromDate = dateString => {
  const previousDate = new Date(dateString);
  const currentDate = new Date();
  const difference = currentDate - previousDate;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);
  console.log(`Пройшло ${days} днів, ${hours} годин і ${minutes} хвилин.`);
  if (days === 0 && hours === 0 && minutes === 0) {
    return 'Зараз на сайті';
  }
    if (!dateString) {
      return 'Давно не бачили';
    }
    if (days === 0 && hours !== 0) {
      return `Заходив ${hours} год. ${minutes} хв. тому`;
    }
  if (days === 0 && hours === 0) {
    return `Заходив ${minutes} хв. тому`;
  }
  return `Заходив ${days} дн. ${hours} год. ${minutes} хв. тому`;
}

const SellerInfo = ({ owner }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOtherUser(owner));
  }, [dispatch, owner]);

  const userInfo = useSelector(selectOtherUser);
  const { userAvatar, username, cityName, dateCreate, lastVisit } = userInfo;
  
  const lastVisitDate = getTimePassedFromDate(lastVisit);
  const rating = 3.2;
  const gradesAmount = 12;
  const daysAmount = getDaysPassedFromDate(dateCreate);
  const followersAmount = 36;
  const salesAmount = 16;

  return (
    <>
      <div className={s.profilewrapper}>
        <div className={s.avatarframe}>
          <div className={s.avatar}>
            <Avatar avatarClass="photoAvatar" src={userAvatar} />
          </div>
        </div>
        <div className={s.userframe}>
          <div className={s.profilebox}>
            <h5 className={s.username}>{username}</h5>
            <UserRating rating={rating} gradesAmount={gradesAmount} />
          </div>
          <div className={s.infowrapper}>
            <BsCheck2 className={s.iconBefore} />
            <p className={s.text}>На Easy shop</p>
            <DaysValue
              value={daysAmount}
              className={`${s.rightvalue} ${s.text}`}
            />
          </div>
          <div className={s.profileinfo}>
            <div className={s.infowrapper}>
              <BsClock className={s.iconBefore} />
              <p className={s.text}>{lastVisitDate}</p>
            </div>
            <div className={s.infowrapper}>
              <BsGeoAlt className={s.iconBefore} />
              <p className={s.text}>{cityName}</p>
            </div>
            <div className={s.infowrapper}>
              <BsPeople className={s.iconBefore} />
              <p className={s.text}>
                <Value className={s.leftvalue}>{followersAmount}</Value>
                підписників
              </p>
            </div>
            <div className={s.infowrapper}>
              <BsHandbag className={s.iconBefore} />
              <p className={s.text}>
                <Value className={s.leftvalue}>{salesAmount}</Value>
                продажів
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default SellerInfo;
