import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateUser } from 'redux/auth/auth-opetations';
// import {
//   Suspense,
//   useEffect,
// } from 'react';
import Loader from '../Loader/Loader';
import UserProfileInfo from 'components/Profile/UserProfileInfo/UserProfileInfo';
import UserInfoDetails from './UserInfoDetails/UserInfoDetails';

import s from './Profile.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const [isUserLoaded, setIsUserLoaded] = useState(false);

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('easy-shop.authData'));
    if (authData && authData.accessToken) {
      const userData = {
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
        sid: authData.sid,
      };
      dispatch(updateUser(userData));
    } else {
      setIsUserLoaded(true);
    }
  }, [dispatch]);

  const location = useLocation();
  console.log(location);

  return (
    <>
      {isUserLoaded && <Loader />}
      <section className={s.profileavatar}>
        <UserProfileInfo />
      </section>
      <section className={s.profiledeatails}>
        <UserInfoDetails />
      </section>
    </>
  );
};

export default Profile;
