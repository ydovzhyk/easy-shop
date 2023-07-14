import { useState, useEffect } from 'react';
import { BsSuitHeart } from 'react-icons/bs';
import { HiPlus } from 'react-icons/hi';
import { SlBasket } from 'react-icons/sl';
import { HiOutlineUser } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';

import { NavLink } from 'react-router-dom';

import { useMediaQuery } from 'react-responsive';

import { useSelector } from 'react-redux';
import { getLogin, getUser, getUserAvatar } from 'redux/auth/auth-selectors';

import s from './BottomNavigation.module.scss';

const BottomNavigation = () => {
  const [userBasketLength, setUserBasketLength] = useState(0);
  const [userLikesLength, setUserLikesLength] = useState(0);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  const isLogin = useSelector(getLogin);
  const userAvatar = useSelector(getUserAvatar);
  const user = useSelector(getUser);

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

  return (
    <nav className={s.navigationBottom}>
      <div className={s.containerBottom}>
        <NavLink
          to={isLogin ? '/basket' : '/login'}
          className={({ isActive }) => `${isActive ? s.active : ''}`}
        >
          <SlBasket className={s.navIcon} size={isMobile ? 25 : 30} />
          <span>{userBasketLength}</span>
        </NavLink>
        <NavLink
          to={isLogin ? '/favorites' : '/login'}
          className={({ isActive }) => `${isActive ? s.active : ''}`}
        >
          <BsSuitHeart className={s.navIcon} size={isMobile ? 25 : 30} />
          <span>{userLikesLength}</span>
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
          <span>0</span>
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
              src={userAvatar}
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
