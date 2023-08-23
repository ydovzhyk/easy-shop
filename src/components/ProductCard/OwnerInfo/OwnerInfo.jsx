import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getOtherUser } from 'redux/otherUser/otherUser-operations';
import { getLoadingOtherUser, selectOtherUser } from 'redux/otherUser/otherUser-selectors';
import { getLogin, getUserMessage } from 'redux/auth/auth-selectors';
import { updateUserSibscribes } from 'redux/auth/auth-operations';

import Avatar from 'components/Profile/Avatar/Avatar';
import UserRating from 'components/Profile/ProfileInfo/UserRating';
import Value from 'components/Profile/Value';
import DaysValue from 'components/Shared/helper/DaysValue';
import { getDaysPassedFromDate, getPhrase } from 'funcs&hooks/culculatingTimeFunc';
import {
  BsCheck2,
  BsGeoAlt,
  BsHandbag,
  BsPeople,
  BsClock,
} from 'react-icons/bs';
import verifyIcon from 'images/product-card/verified.svg';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import Button from 'components/Shared/Button/Button';
import s from 'components/ProductCard/OwnerInfo/OwnerInfo.module.scss';

const OwnerInfo = ({ owner }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (owner) {
      dispatch(getOtherUser(owner));
    }
  }, [dispatch, owner]);

  const userInfo = useSelector(selectOtherUser);
  const isLoading = useSelector(getLoadingOtherUser);
  const isLogin = useSelector(getLogin);
  const message = useSelector(getUserMessage);
  const [isMessage, setIsMessage] = useState('');
    useEffect(() => {
      setIsMessage(message);
    }, [message]);

    const resetMessage = () => {
      setIsMessage('');
  };
  
  const handleSubscribe = async event => {
    event.preventDefault();
    if (!isLogin) {
      navigate('/login');
      return;
    }
    await dispatch(updateUserSibscribes(_id));
    dispatch(getOtherUser(owner));
  };

  const {
    userAvatar,
    username,
    cityName,
    dateCreate,
    lastVisit,
    sex,
    verify,
    userFeedback,
    rating,
    successfulSales,
    userFollowers,
    _id,
  } = userInfo;

  const lastVisitDate = getPhrase(sex, lastVisit);
  const daysAmount = getDaysPassedFromDate(dateCreate);

  return (
    <>
      {!isLoading && userInfo && (
        <div className={s.profilewrapper}>
          <div className={s.avatarframe}>
            <div className={s.avatar}>
              <NavLink className={s.username} to={`/member/${owner}`}>
                <Avatar avatarClass="photoAvatar" src={userAvatar} />
              </NavLink>
            </div>
          </div>
          <div className={s.userframe}>
            <div className={s.profilebox}>
              <NavLink className={s.username} to={`/member/${owner}`}>
                {username}
              </NavLink>
              <UserRating
                rating={rating}
                gradesAmount={userFeedback?.length || 0}
              />
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
                  <Value className={s.leftvalue}>
                    {userFollowers?.length || 0}
                  </Value>
                  підписників
                </p>
              </div>
              <div className={s.infowrapper}>
                <BsHandbag className={s.iconBefore} />
                <p className={s.text}>
                  <Value className={s.leftvalue}>{successfulSales}</Value>
                  продажів
                </p>
              </div>
            </div>
            <Button
              text="Підписатися"
              btnClass="btnLight"
              handleClick={handleSubscribe}
            />
          </div>
        </div>
      )}
      {isMessage && (
        <MessageWindow text={`${message}`} onDismiss={resetMessage} />
      )}
    </>
  );
};
export default OwnerInfo;
