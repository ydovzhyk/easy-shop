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
import { clearDialogueState } from 'redux/dialogue/dialogue-slice';
import { clearOtherUserState } from 'redux/otherUser/otherUser.slice';
import { clearProductsState } from 'redux/product/product-slice';
import { clearOrderState } from 'redux/order/order-slice';
import { clearReviewState } from 'redux/review/review-slice';
import { clearVerifyState } from 'redux/verifyEmail/verifyEmail-slice';
import ProfileInfo from 'components/Profile/ProfileInfo/ProfileInfo';
import UserInfoDetails from 'components/Profile/UserInfoDetails/UserInfoDetails';
import { calculateAverageRating } from 'funcs&hooks/calculateAverageRating';

import s from './Profile.module.scss';

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const avatar = useSelector(getUserAvatar);
  const name = useSelector(getUserName);
  const dateCreate = useSelector(getUserDateCreate);
  const user = useSelector(getUser);
  const userAddress = user.userAddress || 'Kyiv';
  const { verify, lastVisit, userFeedback, successfulSales, userFollowers } =
    user;
  const averageRating = calculateAverageRating(userFeedback);
  const gradesAmount = userFeedback?.length || 0;

  const onLogout = async () => {
    navigate('/');
    await dispatch(logout());
    const authData = {
      accessToken: null,
      refreshToken: null,
      sid: null,
    };
    dispatch(clearDialogueState());
    dispatch(clearOtherUserState());
    dispatch(clearOrderState());
    dispatch(clearProductsState());
    dispatch(clearReviewState());
    dispatch(clearVerifyState());
    await localStorage.setItem('easy-shop.authData', JSON.stringify(authData));
  };

  return (
    <>
      <section className={s.profileavatar}>
        <ProfileInfo
          userAvatar={avatar}
          userName={name}
          rating={averageRating}
          gradesAmount={gradesAmount}
          date={dateCreate}
          lastVisit={lastVisit}
          cityName={userAddress}
          verify={verify}
          followersAmount={userFollowers?.length || 0}
          salesAmount={successfulSales}
          isExitButton="true"
          onClick={onLogout}
        />
      </section>
      <section className={s.profiledeatails}>
        <UserInfoDetails />
      </section>
    </>
  );
};

export default Profile;
