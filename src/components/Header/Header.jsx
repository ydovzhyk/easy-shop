import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import UserInfo from 'components/UserInfo/UserInfo';
import { getLogin } from 'redux/auth/auth-selectors';

import s from './Header.module.scss';
import Logo from 'components/Shared/Logo';
import search from '../../images/header/search-icon.svg';

const Header = () => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const location = useLocation();
  const getClassName = ({ isActive }) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };

  const isLogin = useSelector(getLogin);

  return (
    <header className={s.header}>
      <div className={s.containerTop}>
        <Logo />
        {!isDesctop && (
          <div>
            <svg
              className="s.icon-search"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <use href="../../images/header/search-icon.svg#icon-search"></use>
            </svg>
            {/* <img src={search} alt="search icon" width="16" height="16" /> */}
          </div>
        )}
        {isDesctop && <UserInfo />}
      </div>
      {isLogin && (
        <div className={s.containerBottom}>
          <NavLink
            className={getClassName({
              isActive: location.pathname === '/restaurants',
            })}
            to="/restaurants"
          >
            Жінкам
          </NavLink>
          <NavLink
            className={getClassName({
              isActive: location.pathname === '/supermarkets',
            })}
            to="/supermarkets"
          >
            Чоловікам
          </NavLink>
          <NavLink
            className={getClassName({
              isActive: location.pathname === '/health',
            })}
            to="/health"
          >
            Дитячі речі
          </NavLink>
        </div>
      )}
    </header>
  );
};

export default Header;
