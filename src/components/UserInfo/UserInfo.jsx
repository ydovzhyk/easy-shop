import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsEscape } from 'react-icons/bs';
import { RxDividerVertical } from 'react-icons/rx';
import { RxOpenInNewWindow } from 'react-icons/rx';
import { AiOutlinePoweroff } from 'react-icons/ai';

import s from './UserInfo.module.scss';

import {
  getLogin,
  getUserName,
  getUser,
  getUserAvatar,
} from 'redux/auth/auth-selectors';
import { logout } from 'redux/auth/auth-opetations';
import cartIcon from '../../images/header/cart-icon.svg';
import heartIcon from '../../images/header/heart-icon.svg';
import Button from 'components/Shared/Button';

const UserInfo = () => {
  const isUserLogin = useSelector(getLogin);
  const userName = useSelector(getUserName);
  const userAvatar = useSelector(getUserAvatar);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
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
              stroke-width={3}
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
            marginRight: '15px',
          }}
        >
          <NavLink to="/basket" className={getClassName}>
            <img
              src={cartIcon}
              alt="Cart Icon"
              style={{ width: '26px', height: '26px', marginRight: '10px' }}
            />
            <span>{user.userBasket.length}</span>
          </NavLink>
        </div>
        <div
          className={s.wrapper}
          style={{
            marginRight: '15px',
          }}
        >
          <NavLink to="/favorites" className={getClassName}>
            <img
              src={heartIcon}
              alt="Heart Icon"
              width={24}
              height={24}
              style={{ marginRight: '10px' }}
            />
            <span>{user.userLikes.length}</span>
          </NavLink>
        </div>
        <div className={s.userWrapper}>
          <div className={s.wrapper}>
            <NavLink className={getClassName} to="/profile">
              <div className={s.userBlock}>
                <img
                  src={userAvatar}
                  alt="Userphoto"
                  width={45}
                  height={45}
                  className={s.userPhoto}
                />
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
