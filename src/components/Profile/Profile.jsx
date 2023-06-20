import React from 'react';
// import { useLocation } from 'react-router-dom';
// import {
//   Suspense,
//   useEffect,
// } from 'react';
import UserProfileInfo from 'components/Profile/UserProfileInfo/UserProfileInfo';
import UserInfoDetails from './UserInfoDetails/UserInfoDetails';

import s from './Profile.module.scss';

const Profile = () => {
  // const location = useLocation();

  return (
    <>
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
