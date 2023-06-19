import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getLogin, getIsRefreshing } from 'redux/auth/auth-selectors';

const PrivateRoute = () => {
  const isLogin = useSelector(getLogin);
  const isRefreshing = useSelector(getIsRefreshing);

  if (!isLogin && !isRefreshing) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoute;
