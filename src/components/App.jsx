import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { updateUser } from 'redux/auth/auth-opetations';
import { getError, getLoadingUser } from 'redux/auth/auth-selectors';
import {
  getLoadingProducts,
  getProductError,
} from 'redux/product/product-selectors';
import {
  getLoadingVerifyEmail,
  getErrorVerifyEmail,
} from 'redux/verifyEmail/verifyEmail-selectors';
import {
  getLoadingDialogue,
  getDialogueError,
} from 'redux/dialogue/dialogue-selectors';
import {
  getLoadingOtherUser,
  getOtherUserError,
} from 'redux/otherUser/otherUser-selectors';
import UserRoutes from './Routes/UserRoutes';
import Header from './Header';
import Footer from './Footer/Footer';
import BottomNavigation from './BottomNavigation';
import Loader from './Loader/Loader';
import ErrorMessage from './Shared/ErrorMessage/ErrorMessage';
import { useLocation } from 'react-router-dom';

export const App = () => {
  const authError = useSelector(getError);
  const productError = useSelector(getProductError);
  const verifyEmailError = useSelector(getErrorVerifyEmail);
  const dialogueError = useSelector(getDialogueError);
  const otherUserError = useSelector(getOtherUserError);
  const loadingUser = useSelector(getLoadingUser);
  const loadingProducts = useSelector(getLoadingProducts);
  const loadingVerify = useSelector(getLoadingVerifyEmail);
  const loadingDialogue = useSelector(getLoadingDialogue);
  const loadingOtherUser = useSelector(getLoadingOtherUser);
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const dispatch = useDispatch();
  const [errMessage, setErrMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();
  const headerFooterHidden =
    location.pathname === '/login' || location.pathname === '/registration';

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('easy-shop.authData'));
    if (authData && authData.accessToken) {
      const userData = {
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
        sid: authData.sid,
      };
      dispatch(updateUser(userData));
    } else {
      return;
    }
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setErrMessage(authError);
    } else if (productError) {
      setErrMessage(productError);
    } else if (verifyEmailError) {
      setErrMessage(verifyEmailError);
    } else if (dialogueError) {
      setErrMessage(dialogueError);
    } else if (otherUserError) {
      setErrMessage(otherUserError);
    } else {
      setErrMessage('');
    }
  }, [
    authError,
    productError,
    verifyEmailError,
    dialogueError,
    otherUserError,
  ]);

  useEffect(() => {
    if (
      loadingUser ||
      loadingProducts ||
      loadingVerify ||
      loadingDialogue ||
      loadingOtherUser
    ) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [
    loadingUser,
    loadingProducts,
    loadingVerify,
    loadingDialogue,
    loadingOtherUser,
  ]);

  // render last visited page
  useEffect(() => {
    const pageInfo = JSON.parse(localStorage.getItem('easy-shop-page-info'));
    const currentPath = location.pathname;

    if (pageInfo && pageInfo.lastVisitedPage && pageInfo.lastVisitedTime) {
      const currentTime = new Date().getTime();
      const timeDifference =
        (currentTime - parseInt(pageInfo.lastVisitedTime, 10)) / (1000 * 60);
      if (timeDifference > 120) {
        localStorage.removeItem('easy-shop-page-info');
        window.location.href = '/';
      }
    }

    const pageInfoToUpdate = {
      lastVisitedPage: currentPath,
      lastVisitedTime: new Date().getTime().toString(),
    };
    localStorage.setItem(
      'easy-shop-page-info',
      JSON.stringify(pageInfoToUpdate)
    );
  }, [location.pathname]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {errMessage !== '' && <ErrorMessage text={`${errMessage}`} />}
      {!headerFooterHidden && <Header />}
      <main style={{ flexGrow: 1 }}>
        {isLoaded && <Loader />}
        <UserRoutes />
      </main>
      {!headerFooterHidden && !isDesctop && <BottomNavigation />}
      {!headerFooterHidden && <Footer />}
    </div>
  );
};
