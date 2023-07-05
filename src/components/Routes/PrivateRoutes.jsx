import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getLogin } from 'redux/auth/auth-selectors';
import { updateUser } from 'redux/auth/auth-opetations';

const PrivateRoute = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(getLogin);
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const authData = JSON.parse(localStorage.getItem('easy-shop.authData'));
      if (!isLogin && authData && authData.accessToken) {
        const userData = {
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          sid: authData.sid,
        };
        await dispatch(updateUser(userData));
      }
      setIsUserDataLoaded(true);
    };

    fetchData();
  }, [dispatch, isLogin]);

  const authData = JSON.parse(localStorage.getItem('easy-shop.authData'));
  if (!authData?.accessToken) {
    return <Navigate to="/login" />;
  }
  if (!isLogin && !authData?.accessToken) {
    return <Navigate to="/login" />;
  }
  if (isUserDataLoaded) {
    return <Outlet />;
  }
  if (isLogin && !isUserDataLoaded) {
    return <Outlet />;
  }
};

export default PrivateRoute;
