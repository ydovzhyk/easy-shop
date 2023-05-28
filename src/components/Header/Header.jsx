import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import UserInfo from 'components/UserInfo/UserInfo';
import { getLogin } from 'redux/auth/auth-selectors';
import { BiSearchAlt } from 'react-icons/bi';
import { HiOutlineBars4 } from 'react-icons/hi2';
import s from './Header.module.scss';
import Logo from 'components/Shared/Logo';
import Button from 'components/Shared/Button';
import SwitchBtn from 'components/Shared/SwitchBtn/SwitchBtn';
import LanguageChanger from 'components/Shared/LanguageChanger/LanguageChanger';

const Header = () => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();
  const getClassName = ({ isActive }) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };

  const isLogin = useSelector(getLogin);

  return (
    <header className={s.header}>
      <div className={s.containerTop}>
        <div className={s.navTopContainer}>
          {!isDesctop && (
            <Button
              type="button"
              btnClass="burgerButton"
              text={<HiOutlineBars4 size={isMobile ? 25 : 30} />}
            ></Button>
          )}
          <Logo />
        </div>
        <div className={s.switchBtnBox}>
          <LanguageChanger />
          <SwitchBtn />
        </div>
        {!isDesctop && (
          <Button
            type="button"
            btnClass="searchBtn"
            text={<BiSearchAlt size={isMobile ? 25 : 30} />}
          ></Button>
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
