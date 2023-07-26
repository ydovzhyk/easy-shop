import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Outlet } from 'react-router-dom';

import { getUser } from 'redux/auth/auth-selectors';
import Loader from 'components/Loader';
import Container from 'components/Shared/Container';
import ProfileLink from 'components/Profile/ProfileLink/ProfileLink';
import s from 'components/Profile/UserInfoDetails/UserInfoDetails.module.scss';

const UserInfoDetails = () => {
  const user = useSelector(getUser);
  const [myProducts, setMyProducts] = useState(0);
  const [myPurchases, setMyPurchases] = useState(0);

  const location = useLocation().pathname;

  const [isMyWares, setIsMyWares] = useState(false);
  const [isMyPurchases, setIsMyPurchases] = useState(false);
  const [isMyReviews, setIsMyReviews] = useState(false);
  const [isMySettings, setIsMySettings] = useState(false);

  useEffect(() => {
    setIsMyWares(
      location === '/profile' || location === '/profile/mywares' ? true : false
    );
    setIsMyPurchases(location === '/profile/mypurchases' ? true : false);
    setIsMyReviews(location === '/profile/myreviews' ? true : false);
    setIsMySettings(location === '/profile/mysettings' ? true : false);
  }, [location]);

  useEffect(() => {
    if (user) {
      const userProducts = user.userProducts;
      const userProductsLength = userProducts.length;
      setMyProducts(userProductsLength);
      const userOrders = user.userOrders;
      const userOrdersLength = userOrders.length;
      setMyPurchases(userOrdersLength || 0);
    } else {
      setMyProducts(0);
    }
  }, [user]);

  // console.log('isMyWares:', isMyWares);
  // console.log('isMyPurchases:', isMyPurchases);
  // console.log('isMyReviews:', isMyReviews);
  // console.log('isMySettings:', isMySettings);

  return (
    <Container>
      <ul className={s.list}>
        <li className={s.item}>
          <ProfileLink
            to="mywares"
            addValue
            value={myProducts}
            isBackgroundChange={isMyWares}
          >
            Мої товари
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink
            to="mypurchases"
            addValue
            isBackgroundChange={isMyPurchases}
            value={myPurchases}
          >
            Мої покупки
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink to="myreviews" addValue isBackgroundChange={isMyReviews}>
            Мої відгуки
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink to="mysettings" isBackgroundChange={isMySettings}>
            Мої налаштування
          </ProfileLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default UserInfoDetails;
