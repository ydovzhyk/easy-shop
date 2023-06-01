import { useSelector } from 'react-redux';
import { BsCheck2, BsGeoAlt, BsHandbag, BsPeople } from "react-icons/bs";
import { getUserName, getUser } from 'redux/auth/auth-selectors';
import Container from 'components/Shared/Container';
import Avatar from 'components/Profile/Avatar';
import UserRating from './UserRating';
import Value from '../Value';
import DaysValue from "components/Profile/UserInfo/DaysValue";
import s from './UserInfo.module.scss';

const UserInfo = () => {
    const userName = useSelector(getUserName);
    const user = useSelector(getUser);
    console.log(user);
    const userAddress = user.userAddress || "Kyiv";
    console.log(userAddress);
    const rating = 3.2;
    const gradesAmount = 12;
    const daysAmount = 15;
    const followersAmount = 36;
    const salesAmount = 16;
    return (
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
                        <UserRating
                            rating={rating}
                            gradesAmount={gradesAmount}
                        />
                
              </div>
              <div className={s.infowrapper}>
                <BsCheck2 className={s.iconBefore} />
                <p className={s.text}>
                  На Easy shop 
                </p>
                <DaysValue
                    value = {daysAmount}
                    className={`${s.rightvalue} ${s.text}`}
                  />
              </div>
              <div className={s.profileinfo}>
                <div className={s.infowrapper}>
                  <BsGeoAlt className={s.iconBefore} />
                            <p className={s.text}>{userAddress }</p>
                </div>
                <div className={s.infowrapper}>
                  <BsPeople className={s.iconBefore}/>
                  <p className={s.text}>
                                <Value className={s.leftvalue}>{followersAmount}</Value>
                  підписників
                  </p>
                </div>
                <div className={s.infowrapper}>
                  <BsHandbag className={s.iconBefore}/>
                  <p className={s.text}>
                                <Value className={s.leftvalue}>{ salesAmount}</Value>
                    продажів
                  </p>
                </div>
              </div> 
            </div>
          </div>
        </Container>
        
    )

};
export default UserInfo;