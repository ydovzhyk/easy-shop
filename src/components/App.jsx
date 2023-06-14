import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { updateUser } from 'redux/auth/auth-opetations';
import { getError } from 'redux/auth/auth-selectors';
import UserRoutes from './Routes/UserRoutes';
import Header from './Header';
import Footer from './Footer/Footer';
import BottomNavigation from './BottomNavigation';
import Loader from './Loader/Loader';
import ErrorMessage from './Shared/ErrorMessage/ErrorMessage';
import { useLocation } from 'react-router-dom';

export const App = () => {
  const error = useSelector(getError);
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const dispatch = useDispatch();
  const [errMessage, setErrMessage] = useState('');
  const [isUserLoaded, setIsUserLoaded] = useState(false);

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
      setIsUserLoaded(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setErrMessage(error);
    } else {
      setErrMessage('');
    }
    setIsUserLoaded(true);
  }, [error]);

  if (!isUserLoaded) {
    return <Loader />;
  }

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
        <UserRoutes />
      </main>
      {!headerFooterHidden && !isDesctop && <BottomNavigation />}
      {!headerFooterHidden && <Footer />}
    </div>
  );
};
