import { useSelector } from 'react-redux';
import { useLocation, Outlet} from 'react-router-dom';
import { getUserName } from 'redux/auth/auth-selectors';
import { BsStarFill, BsCheck2, BsGeoAlt, BsHandbag, BsPeople } from "react-icons/bs";
import Container from 'components/Shared/Container';
import Avatar from 'components/Profile/Avatar';
import Value from './Value';
import ProfileDetails from './ProfileDetails';
import { Suspense } from "react";
import DaysValue from "./DaysValue";

import s from './Profile.module.scss';

const Profile = () => {
  const userName = useSelector(getUserName);
  const location = useLocation();
  console.log(location);
  
  return (
    <>
      <section className={s.profileavatar}>
        <Container>
          <div className={s.profilewrapper}>
            <div className={s.avatarframe}>
              <div className={s.avatar}>
                <Avatar
                  className={s.photo}
                />
              </div>
            </div>
            <div className={s.userframe}>
              <div className={s.profilebox}>
                <h5 className={s.username}>{userName}</h5>
                <div className={s.ratingbox}>
                  <ul className={s.iconlist}>
                    <li>
                      <BsStarFill className={s.icon} size="16px"/>
                    </li>
                    <li>
                      <BsStarFill className={s.icon} size="16px"/>
                    </li>
                    <li>
                      <BsStarFill className={s.icon} size="16px"/>
                    </li>
                    <li>
                      <BsStarFill className={s.icon} size="16px"/>
                    </li>
                    <li>
                      <BsStarFill className={s.icon} size="16px"/>
                    </li>
                  </ul>
                  <div className={s.valuation}>
                    <Value className={s.leftvalue}></Value>
                    <p>(
                      <Value className={s.leftvalue}></Value>
                      оцінок)
                    </p>
                  </div>
                </div>
              </div>
              <div className={s.partwrapper}>
                <BsCheck2 className={s.iconBefore} />
                <p className={s.text}>
                  На Easy shop 
                </p>
                <DaysValue
                    value = {58}
                    className={`${s.rightvalue} ${s.text}`}
                  />
              </div>
              <div className={s.profileinfo}>
                <div className={s.partwrapper}>
                  <BsGeoAlt className={s.iconBefore} />
                <p className={s.text}>Київ</p>
                </div>
                <div className={s.partwrapper}>
                  <BsPeople className={s.iconBefore}/>
                  <p className={s.text}>
                  <Value className={s.leftvalue}></Value>
                  підписників
                  </p>
                </div>
                <div className={s.partwrapper}>
                  <BsHandbag className={s.iconBefore}/>
                  <p className={s.text}>
                    <Value className={s.leftvalue}></Value>
                    продажів
                  </p>
                </div>
              </div> 
            </div>
          </div>
        </Container>
      </section>
      <section className={s.profile}>
        <Container>
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
        </Container>
      </section>
      </>
  );
};

export default Profile;
