import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from 'redux/auth/auth-opetations';
import { getError, getSid } from 'redux/auth/auth-selectors';
import UserRoutes from './Routes/UserRoutes';
import Header from './Header';
import Footer from './Footer/Footer';
import Loader from './Loader/Loader';
import ErrorMessage from './Shared/ErrorMessage/ErrorMessage';

export const App = () => {
  const error = useSelector(getError);
  const sid = useSelector(getSid);
  const dispatch = useDispatch();
  const [errMessage, setErrMessage] = useState('');
  const [isUserLoaded, setIsUserLoaded] = useState(false);

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
      <Header />
      <main>
        {errMessage !== '' && <ErrorMessage text={`${errMessage}`} />}
        <UserRoutes />
      </main>
      <Footer />
    </>
  );
};
