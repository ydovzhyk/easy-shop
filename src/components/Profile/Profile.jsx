// import { useLocation, Outlet } from 'react-router-dom';
import {
  useDispatch
} from 'react-redux';
import {
  // Suspense,
  useEffect
} from "react";
import { getUserProducts } from 'redux/product/product-operations';
import UserInfo from 'components/Profile/UserInfo/UserInfo';
import UserInfoDetails from './UserInfoDetails/UserInfoDetails';


import s from './Profile.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  useEffect(() => {
        dispatch(getUserProducts());
    }, [dispatch]);
  // const location = useLocation();
  // console.log(location);
  
  return (
    <>
      <section className={s.profileavatar}>
        <UserInfo/>
      </section>
      <section className={s.profiledeatails}>
        <UserInfoDetails/>
      </section>
      </>
  );
};

export default Profile;
