import { useState, useEffect } from 'react';
import { BsEscape } from 'react-icons/bs';
import { SlEnvelopeOpen } from 'react-icons/sl';
import { RxDividerVertical } from 'react-icons/rx';
import { BsBasket } from 'react-icons/bs';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { AiOutlinePoweroff } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';
// import { BsHeartHalf } from 'react-icons/bs';

import { NavLink, useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';

import s from './UserInfo.module.scss';

import {
  getLogin,
  getUserName,
  getUser,
  getUserAvatar,
} from 'redux/auth/auth-selectors';
import { clearDialogueState } from 'redux/dialogue/dialogue-slice';
import { clearOtherUserState } from 'redux/otherUser/otherUser.slice';
import { clearOrderState } from 'redux/order/order-slice';
import { clearReviewState } from 'redux/review/review-slice';
import { clearVerifyState } from 'redux/verifyEmail/verifyEmail-slice';
import { logout } from 'redux/auth/auth-operations';

import Button from 'components/Shared/Button';

const UserInfo = () => {
  const isUserLogin = useSelector(getLogin);
  const userName = useSelector(getUserName);
  const userAvatar = useSelector(getUserAvatar);
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userBasketLength, setUserBasketLength] = useState(0);
  const [userLikesLength, setUserLikesLength] = useState(0);

  useEffect(() => {
    if (user && user.userBasket) {
      setUserBasketLength(user.userBasket.length);
    } else {
      setUserBasketLength(0);
    }

    if (user && user.userLikes) {
      setUserLikesLength(user.userLikes.length);
    } else {
      setUserLikesLength(0);
    }
  }, [user]);

  const onLogout = async () => {
    navigate('/');
    await dispatch(logout());
    const authData = {
      accessToken: null,
      refreshToken: null,
      sid: null,
    };
    dispatch(clearDialogueState());
    dispatch(clearOtherUserState());
    dispatch(clearOrderState());
    dispatch(clearReviewState());
    dispatch(clearVerifyState());
    await localStorage.setItem('easy-shop.authData', JSON.stringify(authData));
  };

  const getClassName = ({ isActive }) => {
    return isActive
      ? `${s.link} ${s.active} ${s.custom}`
      : `${s.link} ${s.custom}`;
  };

  if (!isUserLogin) {
    return (
      <div className={s.userInfoSide}>
        <div className={s.userWrapper}>
          <div className={s.wrapper}>
            <NavLink className={getClassName} to="/login">
              <AiOutlinePoweroff
                size={25}
                style={{
                  color: 'var(--icons-color)',
                  marginRight: '5px',
                }}
              />
              <span>Вхід</span>
            </NavLink>
          </div>
          <svg width="30" height="40">
            <line
              x1={15}
              y1={5}
              x2={15}
              y2={35}
              stroke="var(--border-color)"
              strokeWidth={3}
            />
          </svg>
          <div className={s.wrapper}>
            <NavLink className={getClassName} to="/registration">
              <RxOpenInNewWindow
                size={25}
                style={{
                  color: 'var(--icons-color)',
                  marginRight: '5px',
                }}
              />
              <span>Реєстрація</span>
            </NavLink>
          </div>
        </div>
      </div>
    );
  }

  if (isUserLogin) {
    return (
      <div className={s.userInfoSide}>
        <div
          className={s.wrapper}
          style={{
            marginRight: '25px',
          }}
        >
          <NavLink to="/basket" className={getClassName}>
            <BsBasket style={{ marginRight: '10px' }} size={22} />
            <span>{userBasketLength}</span>
          </NavLink>
        </div>
        <div
          className={s.wrapper}
          style={{
            marginRight: '25px',
          }}
        >
          <NavLink to="/message" className={getClassName}>
            <SlEnvelopeOpen style={{ marginRight: '10px' }} size={21} />
            <span>{user.newMessage ? user.newMessage : 0}</span>
          </NavLink>
        </div>
        <div
          className={s.wrapper}
          style={{
            marginRight: '25px',
          }}
        >
          <NavLink to="/favorites" className={getClassName}>
            <FiHeart style={{ marginRight: '10px' }} size={22} />
            <span>{userLikesLength}</span>
          </NavLink>
        </div>
        <div className={s.userWrapper}>
          <div className={s.wrapper}>
            <NavLink className={getClassName} to="/profile">
              <div className={s.userBlock}>
                <img src={userAvatar} alt="Userphoto" className={s.userPhoto} />
              </div>
              <span>{userName}</span>
            </NavLink>
          </div>
          <RxDividerVertical
            size={40}
            style={{
              color: 'var(--border-color)',
            }}
          />
          <div className={s.wrapper}>
            <BsEscape
              size={25}
              style={{
                marginRight: '10px',
                color: 'var(--icons-color)',
              }}
            />
            <Button
              text="Вихід"
              type="button"
              handleClick={onLogout}
              btnClass="exitHeaderBtn"
            />
          </div>
        </div>
      </div>
    );
  }
};

export default UserInfo;
