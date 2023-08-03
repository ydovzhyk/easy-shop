import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import {
  getUserName,
  getUser,
  getUserAvatar,
  getUserDateCreate,
} from 'redux/auth/auth-selectors';
import {
  clearDialoguesArray,
  clearDialogue,
} from 'redux/dialogue/dialogue-slice';
import { clearOtherUser } from 'redux/otherUser/otherUser.slice';
import { logout } from 'redux/auth/auth-opetations';
import Container from 'components/Shared/Container';
import Avatar from 'components/Profile/Avatar/Avatar';
import UserRating from 'components/Profile/UserProfileInfo/UserRating';
import Value from 'components/Profile/Value';
import DaysValue from 'components/Shared/helper/DaysValue';
import Button from 'components/Shared/Button';
import {
  BsCheck2,
  BsGeoAlt,
  BsHandbag,
  BsPeople,
  BsEscape,
} from 'react-icons/bs';

import s from 'components/Profile/UserProfileInfo/UserProfileInfo.module.scss';

const UserProfileInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(getUserName);
  const user = useSelector(getUser);
  const userAvatar = useSelector(getUserAvatar);
  const dateCreate = useSelector(getUserDateCreate);
  const isTablet = useMediaQuery({ minWidth: 768 });

  const getDaysPassedFromDate = dateString => {
    const date = new Date(dateString);
    const currentDate = new Date();
    const deltaTime = currentDate - date;
    const daysPassed = Math.floor(deltaTime / (1000 * 60 * 60 * 24));
    return daysPassed;
  };

  const userAddress = user.userAddress || 'Kyiv';
  const rating = 3.2;
  const gradesAmount = 12;
  const daysAmount = getDaysPassedFromDate(dateCreate);
  const followersAmount = 36;
  const salesAmount = 16;

  const onLogout = async () => {
    navigate('/');
    await dispatch(logout());
    const authData = {
      accessToken: null,
      refreshToken: null,
      sid: null,
    };
    dispatch(clearDialogue());
    dispatch(clearDialoguesArray());
    dispatch(clearOtherUser());
    await localStorage.setItem('easy-shop.authData', JSON.stringify(authData));
  };

  return (
    <Container>
      <div className={s.profilewrapper}>
        <div className={s.avatarframe}>
          <div className={s.avatar}>
            <Avatar src={userAvatar} avatarClass="photoAvatar" />
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
            <div className={s.infowrapper}>
              <BsGeoAlt className={s.iconBefore} />
              <p className={s.text}>{userAddress}</p>
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
        <div className={s.wrapper}>
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
            handleClick={onLogout}
            btnClass="exitHeaderBtn"
          />
        </div>
      </div>
    </Container>
  );
};
export default UserProfileInfo;
