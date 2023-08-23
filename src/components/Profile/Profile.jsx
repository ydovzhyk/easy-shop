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
import {calculateAverageRating} from 'funcs&hooks/calculateAverageRating';

import s from './Profile.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatar = useSelector(getUserAvatar);
  const name = useSelector(getUserName);
  const dateCreate = useSelector(getUserDateCreate);
  const user = useSelector(getUser);
  const userAddress = user.userAddress || 'Kyiv';
  const { verify, lastVisit, userFeedback, successfulSales, userFollowers } = user;
  const averageRating = calculateAverageRating(userFeedback);
  const gradesAmount = userFeedback.length;
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
          rating={averageRating}
          gradesAmount={gradesAmount || 0}
          date={dateCreate}
          lastVisit={lastVisit}
          cityName={userAddress}
          verify={verify}
          followersAmount={userFollowers.length || 0}
          salesAmount={successfulSales}
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
