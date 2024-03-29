import { Suspense, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, Outlet } from 'react-router-dom';

import {
  getUser,
  selectFeedback,
  selectReviews,
  selectUserOrders,
  selectUserSales,
} from 'redux/auth/auth-selectors';
import Loader from 'components/Loader';
import Container from 'components/Shared/Container';
import ProfileLink from 'components/Profile/ProfileLink/ProfileLink';
import s from 'components/Profile/UserInfoDetails/UserInfoDetails.module.scss';

const UserInfoDetails = () => {
  const user = useSelector(getUser);
  const userSales = useSelector(selectUserSales);
  const userPurchases = useSelector(selectUserOrders);
  const userReviews = useSelector(selectReviews);
  const userFeedback = useSelector(selectFeedback);
  const valueforReview = !userReviews
    ? 0
    : userReviews.length + userFeedback.length;

  const [myProducts, setMyProducts] = useState(0);

  const location = useLocation().pathname;

  const [isMyWares, setIsMyWares] = useState(false);
  const [isMyPurchases, setIsMyPurchases] = useState(false);
  const [isMyReviews, setIsMyReviews] = useState(false);
  const [isMySettings, setIsMySettings] = useState(false);
  const [isMySales, setIsMySales] = useState(false);

  useEffect(() => {
    setIsMyWares(
      location === '/profile' || location === '/profile/mywares' ? true : false
    );
    setIsMyPurchases(location === '/profile/mypurchases' ? true : false);
    setIsMyReviews(location === '/profile/myreviews' ? true : false);
    setIsMySettings(location === '/profile/mysettings' ? true : false);
    setIsMySales(location === '/profile/mysales' ? true : false);
  }, [location]);

  useEffect(() => {
    if (user) {
      const userProducts = user.userProducts;
      const userProductsLength = userProducts.length;
      setMyProducts(userProductsLength);
    } else {
      setMyProducts(0);
    }
  }, [user]);

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
            value={userPurchases.length}
          >
            Мої покупки
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink
            to="mysales"
            addValue
            isBackgroundChange={isMySales}
            value={userSales.length}
          >
            Мої продажі
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink
            to="myreviews?type=asSeller"
            addValue
            isBackgroundChange={isMyReviews}
            value={valueforReview}
          >
            Відгуки
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
