import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserInfo from 'components/UserInfo/UserInfo';
import { getLogin } from 'redux/auth/auth-selectors';

import s from './Header.module.scss';
import Logo from 'components/Shared/Logo';

const Header = () => {
  const location = useLocation();
  const getClassName = ({ isActive }) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };

  const isLogin = useSelector(getLogin);

  return (
    <header className={s.header}>
      <div className={s.containerTop}>
        <Logo />
        <UserInfo />
      </div>
      {isLogin && (
        <div className={s.containerBottom}>
          <NavLink
            className={getClassName({
              isActive: location.pathname === '/restaurants',
            })}
            to="/restaurants"
          >
            Ресторани
          </NavLink>
          <NavLink
            className={getClassName({
              isActive: location.pathname === '/supermarkets',
            })}
            to="/supermarkets"
          >
            Супермаркети
          </NavLink>
          <NavLink
            className={getClassName({
              isActive: location.pathname === '/health',
            })}
            to="/tweets"
          >
            Здоров'я та краса
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
