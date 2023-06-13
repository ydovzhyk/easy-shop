import { Suspense} from 'react';
import {useSelector} from 'react-redux';
import {
  useLocation,
  Outlet
} from 'react-router-dom';

import {getMyProducts} from 'redux/product/product-selectors';
import Container from 'components/Shared/Container';
import ProfileLink from './ProfileLink';
import s from './UserInfoDetails.module.scss';

const UserInfoDetails = () => {
  const myProducts = useSelector(getMyProducts);
  console.log('myProducts in UserInfoDetails', myProducts);
  const location = useLocation();
  console.log(location?.pathname);
  
  return (
    <Container>
      <ul className={s.list}>
        <li className={s.item}>
          <ProfileLink to="mywares" addValue value={myProducts.length} state={{from:location}} >
            Мої товари
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink to="mypurchases" addValue>
            Мої покупки
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink to="myreviews" addValue>
            Мої відгуки
          </ProfileLink>
        </li>
        <li className={s.item}>
          <ProfileLink to="mysettings">Мої налаштування</ProfileLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default UserInfoDetails;
