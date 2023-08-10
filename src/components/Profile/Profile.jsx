import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from 'redux/auth/auth-operations';
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
import ProfileInfo from 'components/Profile/ProfileInfo/ProfileInfo';
import UserInfoDetails from 'components/Profile/UserInfoDetails/UserInfoDetails';

import s from './Profile.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatar = useSelector(getUserAvatar);
  const name = useSelector(getUserName);
  const dateCreate = useSelector(getUserDateCreate);
  const user = useSelector(getUser);
  const rating = 3.2;
  const gradesAmount = 12;
  const followersAmount = 36;
  const salesAmount = 16;
  const userAddress = user.userAddress || 'Kyiv';
  const { verify, lastVisit } = user;

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
    <>
      <section className={s.profileavatar}>
        <ProfileInfo
          userAvatar={avatar}
          userName={name}
          rating={rating}
          gradesAmount={gradesAmount}
          date={dateCreate}
          lastVisit={lastVisit}
          cityName={userAddress}
          verify={verify}
          followersAmount={followersAmount}
          salesAmount={salesAmount}
          isExitButton='true'
          onClick={onLogout } />
      </section>
      <section className={s.profiledeatails}>
        <UserInfoDetails />
      </section>
    </>
  );
};

export default Profile;
