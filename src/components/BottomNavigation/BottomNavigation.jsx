import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSelector } from 'react-redux';
import { BsSuitHeart } from 'react-icons/bs';
import { HiPlus } from 'react-icons/hi';
import { SlBasket } from 'react-icons/sl';
import { HiOutlineUser } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';
import { getLogin } from 'redux/auth/auth-selectors';
import userPhoto from '../../images/Avatar/avatar.svg';
import s from './BottomNavigation.module.scss';

const BottomNavigation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isLogin = useSelector(getLogin);

  return (
    <nav className={s.navigationBottom}>
      <div className={s.containerBottom}>
        <NavLink
          to={isLogin ? '/basket' : '/login'}
          className={({ isActive }) => `${isActive ? s.active : ''}`}
        >
          <SlBasket className={s.navIcon} size={isMobile ? 25 : 30} />
        </NavLink>
        <NavLink
          to={isLogin ? '/favorites' : '/login'}
          className={({ isActive }) => `${isActive ? s.active : ''}`}
        >
          <BsSuitHeart className={s.navIcon} size={isMobile ? 25 : 30} />
        </NavLink>
        <NavLink
          to={isLogin ? '/add-product' : '/login'}
          className={({ isActive }) => `${isActive ? s.active : ''}`}
        >
          <div className={s.circleBox}>
            <HiPlus className={s.navIcon} size={isMobile ? 25 : 30} />
          </div>
        </NavLink>
        <NavLink
          to={isLogin ? '/products' : '/login'}
          className={({ isActive }) => `${isActive ? s.active : ''}`}
        >
          <BiMessageDetail className={s.navIcon} size={isMobile ? 25 : 30} />
        </NavLink>
        <NavLink
          to={isLogin ? '/profile' : '/login'}
          className={({ isActive }) => `${isActive ? s.active : ''}`}
        >
          {!isLogin && (
            <HiOutlineUser className={s.navIcon} size={isMobile ? 25 : 30} />
          )}
          {isLogin && (
            <img
              src={userPhoto}
              alt="Userphoto"
              className={s.userPhoto}
              width={isMobile ? 30 : 40}
              height={isMobile ? 30 : 40}
            />
          )}
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavigation;
