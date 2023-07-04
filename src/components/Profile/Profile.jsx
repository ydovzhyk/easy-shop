import React from 'react';
import UserProfileInfo from 'components/Profile/UserProfileInfo/UserProfileInfo';
import UserInfoDetails from './UserInfoDetails/UserInfoDetails';

import s from './Profile.module.scss';

const Profile = () => {
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
