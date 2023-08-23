import { useMediaQuery } from 'react-responsive';
import {
  BsCheck2,
  BsGeoAlt,
  BsHandbag,
  BsPeople,
  BsEscape,
  BsClock,
} from 'react-icons/bs';
import Container from 'components/Shared/Container';
import Avatar from 'components/Profile/Avatar/Avatar';
import UserRating from 'components/Profile/ProfileInfo/UserRating';
import Value from 'components/Profile/Value';
import DaysValue from 'components/Shared/helper/DaysValue';
import Button from 'components/Shared/Button';
import { getDaysPassedFromDate, getPhrase } from 'components/ProductCard/OwnerInfo/culculatingTimeFunc';

import verifyIcon from 'images/product-card/verified.svg';

import s from 'components/Profile/ProfileInfo/ProfileInfo.module.scss';

const ProfileInfo = ({
  userAvatar,
  userName,
  rating,
  gradesAmount,
  date,
  lastVisit,
  sex,
  cityName,
  verify,
  followersAmount,
  salesAmount,
  onClick,
  isExitButton, 
  onSubscribe,
  isSubscriptionButton,
}) => {
  const isTablet = useMediaQuery({ minWidth: 768 });
  const lastVisitDate = getPhrase(sex, lastVisit);
  const daysAmount = getDaysPassedFromDate(date);
  

  return (
    <Container>
      <div className={s.profilewrapper}>
        <div className={s.mainInformationWrapper}>
          <div className={s.avatarframe}>
          <div className={s.avatar}>
          {userAvatar && <Avatar src={userAvatar} avatarClass="photoAvatar" />}
          </div>
        </div>
        <div className={s.userframe}>
          <div className={s.profilebox}>
            <h5 className={s.username}>{userName}</h5>
            <UserRating rating={rating} gradesAmount={gradesAmount} />
          </div>
          <div className={s.infowrapper}>
            <BsCheck2 className={s.iconBefore} />
            <p className={s.text}>На Easy shop</p>
            <DaysValue
              value={daysAmount}
              className={`${s.rightvalue} ${s.text}`}
            />
          </div>
          <div className={s.profileinfo}>
            {verify && (
                <div className={s.infowrapper}>
                  <img
                    src={verifyIcon}
                    alt="verify Icon"
                    className={s.iconBefore}
                  />
                  <p className={s.text}>Верифікований користувач</p>
                </div>
            )}
            <div className={s.infowrapper}>
                <BsClock className={s.iconBefore} />
                <p className={s.text}>{lastVisitDate}</p>
              </div>
            <div className={s.infowrapper}>
              <BsGeoAlt className={s.iconBefore} />
              <p className={s.text}>{cityName || 'Kyiv'}</p>
            </div>
            
            <div className={s.infowrapper}>
              <BsPeople className={s.iconBefore} />
              <p className={s.text}>
                <Value className={s.leftvalue}>{followersAmount}</Value>
                підписників
              </p>
            </div>
            <div className={s.infowrapper}>
              <BsHandbag className={s.iconBefore} />
              <p className={s.text}>
                <Value className={s.leftvalue}>{salesAmount}</Value>
                продажів
              </p>
            </div>
          </div>
        </div>
        </div>
        
        {isExitButton && <div className={s.wrapper}>
          <BsEscape
            size={25}
            style={{
              marginRight: isTablet ? '10px' : '0px',
              marginBottom: isTablet ? '0px' : '10px',
              color: 'var(--icons-color)',
            }}
          />
          <Button
            text="Вихід"
            type="button"
            handleClick={onClick}
            btnClass="exitHeaderBtn"
          />
        </div>}
        {isSubscriptionButton &&
          <div className={s.subscriptionWrapper}>
          <Button
            text="Підписатися"
            btnClass='btnLight'
            handleClick={onSubscribe}
            />
        </div>}
      </div>
    </Container>
  );
};
export default ProfileInfo;
