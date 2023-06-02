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
        {/* <Container>
          <ul className={s.list}>
            <li className={s.item}>
              <ProfileDetails                
                to='mythings'
              >Мої речі</ProfileDetails>
            </li>
            <li className={s.item}>
              <ProfileDetails
                to='mywares'
              >Мої товари</ProfileDetails>
            </li>
            <li className={s.item}>
              <ProfileDetails
                to='myshoppings'
              >Мої покупки</ProfileDetails>
            </li>
            <li className={s.item}>
              <ProfileDetails
                to='myreviews'
              >Мої відгуки</ProfileDetails>
            </li>
            
          </ul>

          <Suspense fallback={<div>Loading...</div>}>
            <Outlet/>
          </Suspense>
        </Container> */}
      </section>
      </>
  );
};

export default Profile;
