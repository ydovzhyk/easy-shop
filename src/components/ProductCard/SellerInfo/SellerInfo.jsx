import { useEffect } from 'react';

import { NavLink } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import { getOtherUser } from 'redux/otherUser/otherUser-operations';
import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';

import Avatar from 'components/Profile/Avatar/Avatar';
import UserRating from 'components/Profile/UserProfileInfo/UserRating';
import Value from 'components/Profile/Value';
import DaysValue from 'components/Shared/helper/DaysValue';
import { getDaysPassedFromDate, getPhrase } from './culculatingTimeFunc';
import {
  BsCheck2,
  BsGeoAlt,
  BsHandbag,
  BsPeople,
  BsClock,
} from 'react-icons/bs';
import verifyIcon from 'images/product-card/verified.svg';
import s from './SellerInfo.module.scss';

const SellerInfo = ({ owner }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOtherUser(owner));
  }, [dispatch, owner]);

  const userInfo = useSelector(selectOtherUser);
  const { userAvatar, username, cityName, dateCreate, lastVisit, sex, verify } =
    userInfo;

  const lastVisitDate = getPhrase(sex, lastVisit);
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
            {userInfo && <Avatar avatarClass="photoAvatar" src={userAvatar} />}
          </div>
        </div>
        {userInfo && (
          <div className={s.userframe}>
            <div className={s.profilebox}>
              <NavLink className={s.username} to={`/member/${username}`}>
                {username}
              </NavLink>
              {/* <h5 className={s.username}>{username}</h5> */}
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
              {verify && (
                <div className={s.infowrapper}>
                  <img
                    src={verifyIcon}
                    alt="verify Icon"
                    className={s.iconBefore}
                  />
                  <p className={s.text}>Верифікований користувач</p>
                </div>
              )}

              <div className={s.infowrapper}>
                <BsClock className={s.iconBefore} />
                <p className={s.text}>{lastVisitDate}</p>
              </div>
              <div className={s.infowrapper}>
                <BsGeoAlt className={s.iconBefore} />
                <p className={s.text}>{cityName || 'Kyiv'}</p>
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
        )}
      </div>
    </>
  );
};
export default SellerInfo;
