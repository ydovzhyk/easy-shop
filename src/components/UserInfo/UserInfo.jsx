import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import s from './UserInfo.module.scss';

import { getLogin, getUserName, getUser } from 'redux/auth/auth-selectors';
import { logout } from 'redux/auth/auth-opetations';
import cartIcon from '../../images/header/cart-icon.svg';
import heartIcon from '../../images/header/heart-icon.svg';
import Button from 'components/Shared/Button';

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

  const getClassNameProfile = ({ isActive }) => {
    return isActive
      ? `${s.link} ${s.active} ${s.custom}`
      : `${s.link} ${s.custom}`;
  };

  if (!isUserLogin) {
    return (
      <div className={s.userInfoSide}>
        <NavLink className={getClassName} to="/login">
          Вхід
        </NavLink>
        <NavLink className={getClassName} to="login/registration">
          Реєстрація
        </NavLink>
      </div>
    );
  }

  if (isUserLogin) {
    return (
      <div className={s.userInfoSide}>
        <NavLink to="/basket" className={getClassNameProfile}>
          <img
            src={cartIcon}
            alt="Cart Icon"
            style={{ width: '26px', height: '26px' }}
          />
          <span className={s.goodsNumber}>{user.userBasket.length}</span>
        </NavLink>
        <NavLink to="/favorites" className={getClassNameProfile}>
          <img
            src={heartIcon}
            alt="Heart Icon"
            style={{ width: '24px', height: '24px' }}
          />
          <span className={s.goodsNumber}>{user.userLikes.length}</span>
        </NavLink>
        <NavLink to="/profile" className={getClassName}>
          {userName}
        </NavLink>
        <Button
          text="Вихід"
          type="button"
          handleClick={onLogout}
          btnClass="exitHeaderBtn"
        />
      </div>
    );
  }
};

export default UserInfo;
