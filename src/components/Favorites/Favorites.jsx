import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import { getUser } from 'redux/auth/auth-selectors';

import Container from 'components/Shared/Container';

import s from './Favorites.module.scss';

const Favorites = () => {
  const location = useLocation().pathname;

  const [userLikesLength, setUserLikesLength] = useState(0);
  const [subscriptionsLength, setSubscriptionsLength] = useState(0);
  const [searchSubscriptionsLength, setSearchSubscriptionsLength] = useState(0);

  const user = useSelector(getUser);

  const [isLikedProducts, setLikedProducts] = useState(false);
  const [isUserSubscriptions, setUserSubscriptions] = useState(false);
  const [isSelectedSearches, setSelectedSearches] = useState(false);

  useEffect(() => {
    setLikedProducts(
      location === '/favorites' || location === '/favorites/liked-products'
        ? true
        : false
    );
    setUserSubscriptions(
      location === '/favorites/user-subscriptions' ? true : false
    );
    setSelectedSearches(
      location === '/favorites/selected-searches' ? true : false
    );
  }, [location]);

  useEffect(() => {
    if (user && user.userLikes) {
      setUserLikesLength(user.userLikes.length);
    } else {
      setUserLikesLength(0);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.userSubscriptions) {
      setSubscriptionsLength(user.userSubscriptions.length);
    } else {
      setSubscriptionsLength(0);
    }
  }, [user]);

  useEffect(() => {
    if (user && user.userSearchSubscription) {
      setSearchSubscriptionsLength(user.userSearchSubscription.length);
    } else {
      setSearchSubscriptionsLength(0);
    }
  }, [user]);

  return (
    <Container>
      <ul className={s.listLikes}>
        <li className={s.itemLikes}>
          <div className={s.wrapper}>
            <NavLink
              to="liked-products"
              className={isLikedProducts ? s.activeLink : s.linkStyle}
            >
              Обрані товари - {userLikesLength}
            </NavLink>
          </div>
        </li>
        <li className={s.itemLikes}>
          <div className={s.wrapper}>
            {' '}
            <NavLink
              to="user-subscriptions"
              className={`${isUserSubscriptions ? s.activeLink : s.linkStyle} `}
            >
              Обрані продавці - {subscriptionsLength}
            </NavLink>
          </div>
        </li>
        <li className={s.itemLikes}>
          <div className={s.wrapper}>
            <NavLink
              to="selected-searches"
              className={`${isSelectedSearches ? s.activeLink : s.linkStyle} `}
            >
              Обрані пошуки - {searchSubscriptionsLength}
            </NavLink>
          </div>
        </li>
      </ul>
      <Outlet />
    </Container>
  );
};

export default Favorites;
