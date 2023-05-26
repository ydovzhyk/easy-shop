import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { updateUser } from 'redux/auth/auth-opetations';
import { getLogin } from 'redux/auth/auth-selectors';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(getLogin);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  useEffect(() => {
    if (!isLogin) {
      dispatch(updateUser());
    }
    setIsUserLoaded(true);
  }, [dispatch, isLogin]);
  if (!isUserLoaded) {
    return null; // або показати лоадер
  }
  if (!isLogin) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
