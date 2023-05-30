import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { updateUser } from 'redux/auth/auth-opetations';
import { getError, getSid } from 'redux/auth/auth-selectors';
import UserRoutes from './Routes/UserRoutes';
import Header from './Header';
import Footer from './Footer/Footer';
import BottomNavigation from './BottomNavigation';
import Loader from './Loader/Loader';
import ErrorMessage from './Shared/ErrorMessage/ErrorMessage';
import { useLocation } from 'react-router-dom';

export const App = () => {
  const error = useSelector(getError);
  const sid = useSelector(getSid);
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const dispatch = useDispatch();
  const [errMessage, setErrMessage] = useState('');
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  
  const location = useLocation();
  const headerFooterHidden =
    location.pathname === '/login' ||
    location.pathname === '/login/registration';

  useEffect(() => {
    if (sid) {
      dispatch(updateUser());
    } else {
      setIsUserLoaded(true);
    }
  }, [dispatch, sid]);

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
    <>
      {!headerFooterHidden && <Header />}
      <main>
        {errMessage !== '' && <ErrorMessage text={`${errMessage}`} />}
        <UserRoutes />
      </main>
      {!headerFooterHidden && !isDesctop && <BottomNavigation />}
      {!headerFooterHidden && <Footer />}
    </>
  );
};
