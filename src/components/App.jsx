import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import UserRoutes from './Routes/UserRoutes';
import Header from './Header';
import Footer from './Footer/Footer';
import ErrorMessage from './Shared/ErrorMessage/ErrorMessage';
import { getError } from 'redux/auth/auth-selectors';

export const App = () => {
  const error = useSelector(getError);
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    if (error) {
      setErrMessage(error);
    } else {
      setErrMessage('');
      return;
    }
  }, [error]);

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
