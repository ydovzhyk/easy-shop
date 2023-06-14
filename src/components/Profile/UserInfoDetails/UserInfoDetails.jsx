import { Suspense, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  useLocation,
  Outlet
} from 'react-router-dom';

import { getMyProducts } from 'redux/product/product-selectors';
import Loader from 'components/Loader';
import Container from 'components/Shared/Container';
import ProfileLink from 'components/Profile/ProfileLink/ProfileLink';
import s from 'components/Profile/UserInfoDetails/UserInfoDetails.module.scss';

const UserInfoDetails = () => {
  const myProducts = useSelector(getMyProducts);
  console.log('myProducts in UserInfoDetails', myProducts);
  const location = useLocation().pathname;
  // console.log(location);
    
  const [isMyWares, setIsMyWares] = useState(false);
  const [isMyPurchases, setIsMyPurchases] = useState(false);
  const [isMyReviews, setIsMyReviews] = useState(false);
  const [isMySettings, setIsMySettings] = useState(false);

  useEffect(() => {
    setIsMyWares(location === '/profile' || location === '/profile/mywares' ? true : false);
    setIsMyPurchases(location === '/profile/mypurchases' ? true : false);
    setIsMyReviews(location === '/profile/myreviews' ? true : false);
    setIsMySettings(location === '/profile/mysettings' ? true : false)
  }, [location]);

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
            value={myProducts.length}
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
          >
            Мої покупки
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink
            to="myreviews"
            addValue
            isBackgroundChange={isMyReviews}
          >
            Мої відгуки
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink
            to="mysettings"
            isBackgroundChange={isMySettings}
          >
            Мої налаштування
          </ProfileLink>
        </li>
      </ul>
      <Suspense fallback={<Loader/>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default UserInfoDetails;
