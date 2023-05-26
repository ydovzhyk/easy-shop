import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import s from './UserInfo.module.scss';

import { getLogin, getUserName, getUser } from 'redux/auth/auth-selectors';
import { logout } from 'redux/auth/auth-opetations';
import cartIcon from '../../images/header/cart-icon.svg';
import heartIcon from '../../images/header/heart-icon.svg';

const UserInfo = () => {
  const isUserLogin = useSelector(getLogin);
  const userName = useSelector(getUserName);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logout());
  };

  const getClassName = ({ isActive }) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };

  if (!isUserLogin) {
    return (
      <div className={s.userInfoSide}>
        <NavLink className={getClassName} to="/login">
          Вхід
        </NavLink>
        <NavLink className={getClassName} to="/registration">
          Реєстрація
        </NavLink>
      </div>
    );
  }

  if (isUserLogin) {
    return (
      <div className={s.userInfoSide}>
        <NavLink to="/basket" className={`${s.link} ${s.custom}`}>
          <img
            src={cartIcon}
            alt="Cart Icon"
            style={{ width: '26px', height: '26px' }}
          />
          <span className={s.goodsNumber}>{user.userBasket.length}</span>
        </NavLink>
        <NavLink to="/favorites" className={`${s.link} ${s.custom}`}>
          <img
            src={heartIcon}
            alt="Heart Icon"
            style={{ width: '24px', height: '24px' }}
          />
          <span className={s.goodsNumber}>{user.userLikes.length}</span>
        </NavLink>
        <p>{userName}</p>
        <p onClick={onLogout}>Вихід</p>
      </div>
    );
  }
};

export default UserInfo;
