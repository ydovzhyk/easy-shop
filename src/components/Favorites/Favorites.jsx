import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

// import { getUserLikesBasket } from 'redux/auth/auth-operations';
import {
  getUser,
  // getLikedProducts,
  // getTotalLikedProductsPages,
} from 'redux/auth/auth-selectors';
// import { updateUserSubscriptions } from 'redux/otherUser/otherUser-operations';
// import {
//   selectUserSubscriptions,
//   selectTotalPagesUserSubscription,
// } from 'redux/otherUser/otherUser-selectors';

// import FavoritesLink from 'components/Favorites/FavoritesLink/FavoritesLink';
// import LikedProducts from './LikedProducts/LikedProducts';
// import UserSubscriptions from './UserSubscriptions/UserSubscriptions';
import Container from 'components/Shared/Container';
// import Pagination from 'components/Shared/Pagination/Pagination';
// import Button from 'components/Shared/Button';
// import Text from 'components/Shared/Text/Text';

import s from './Favorites.module.scss';

// const TabTypes = {
//   PRODUCTS: 'products',
//   SELLERS: 'sellers',
// };

const Favorites = () => {
  const location = useLocation().pathname;
  console.log('location.pathname', location.pathname);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const [isLiked, setIsLiked] = useState(false);
  // const [selectedTab, setSelectedTab] = useState(TabTypes.PRODUCTS);
  // const [currentPage, setCurrentPage] = useState(1);
  const [userLikesLength, setUserLikesLength] = useState(0);
  const [subscriptionsLength, setSubscriptionsLength] = useState(0);

  const user = useSelector(getUser);

  //
  const [isLikedProducts, setLikedProducts] = useState(false);
  const [isUserSubscriptions, setUserSubscriptions] = useState(false);
  const [isSelectedSearches, setSelectedSearches] = useState(false);

  // const handleLinkClick = path => {
  //   setActiveLink(path);
  // };

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
  // const likedProductsMatch = useMatch('/liked-products');
  // const userSubscriptionsMatch = useMatch('/user-subscriptions');
  // const selectedSearches = useMatch('/selected-searches');
  // const likedProducts = useSelector(getLikedProducts);
  // const totalLikedPages = useSelector(getTotalLikedProductsPages);
  // const userSubscriptions = useSelector(selectUserSubscriptions);
  // const totalPagesSubscription = useSelector(selectTotalPagesUserSubscription);

  // useEffect(() => {
  //   dispatch(getUserLikesBasket({ currentPage }));
  //   dispatch(updateUserSubscriptions({ currentPage }));

  //   setIsLiked(false);
  // }, [dispatch, selectedTab, isLiked, currentPage]);

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

  // console.log('isLikedProducts', isLikedProducts);
  // console.log('isUserSubscriptions', isUserSubscriptions);
  // console.log('isSelectedSearches', isSelectedSearches);

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
              Обрані пошуки
            </NavLink>
          </div>
        </li>
      </ul>
      <Outlet />
    </Container>
  );
};

export default Favorites;
