import { Suspense, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, Outlet } from 'react-router-dom';
import { getUserProducts } from 'redux/product/product-operations';
import { getID } from 'redux/auth/auth-selectors';
import {
  // getProducts,
  getMyProducts,
} from 'redux/product/product-selectors';
import Container from 'components/Shared/Container';
import ProfileDetails from './ProfileDetails';
import s from './UserInfoDetails.module.scss';

const UserInfoDetails = () => {
  const dispatch = useDispatch();
  // const location = useLocation();
  const userID = useSelector(getID);

  useEffect(() => {
        dispatch(getUserProducts(userID));
    }, [dispatch, userID]);
  const myProducts = useSelector(getMyProducts);

  // console.log(myProducts);
  // console.log(location);
  return (
    <Container>
      <ul className={s.list}>
        <li className={s.item}>
          <ProfileDetails to="mywares" addValue value={0}>
            Мої товари
          </ProfileDetails>
        </li>
        <li className={s.item}>
          <ProfileDetails to="mypurchases" addValue>
            Мої покупки
          </ProfileDetails>
        </li>
        <li className={s.item}>
          <ProfileDetails to="myreviews" addValue>
            Мої відгуки
          </ProfileDetails>
        </li>
        <li className={s.item}>
          <ProfileDetails to="/mysettings">Мої налаштування</ProfileDetails>
        </li>
      </ul>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default UserInfoDetails;
