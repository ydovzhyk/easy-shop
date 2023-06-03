// import { useLocation, Outlet } from 'react-router-dom';
// import { Suspense } from "react";
// import Container from 'components/Shared/Container';
// import ProfileDetails from './ProfileDetails';
import UserInfo from 'components/Profile/UserInfo/UserInfo';
import UserInfoDetails from './UserInfoDetails/UserInfoDetails';


import s from './Profile.module.scss';

const Profile = () => {
  
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
