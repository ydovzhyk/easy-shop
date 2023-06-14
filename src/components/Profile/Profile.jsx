// import { useLocation, Outlet } from 'react-router-dom';
import {
  useDispatch
} from 'react-redux';
import {
  // Suspense,
  useEffect
} from "react";
import { getUserProducts } from 'redux/product/product-operations';
import UserProfileInfo from 'components/Profile/UserProfileInfo/UserProfileInfo';
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
        <UserProfileInfo/>
      </section>
      <section className={s.profiledeatails}>
        <UserInfoDetails/>
      </section>
      </>
  );
};

export default Profile;
