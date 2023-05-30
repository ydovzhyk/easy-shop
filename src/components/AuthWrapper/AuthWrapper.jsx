import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import s from './AuthWrapper.module.scss';

import Container from 'components/Shared/Container';

import { getError, getNewUserId } from 'redux/auth/auth-selectors';
// import Register from 'components/Register/Register';
// import Login from 'components/Login/Login';

const AuthWrapper = () => {
  const errorLogin = useSelector(getError);

  const newUserId = useSelector(getNewUserId);

  const location = useLocation();
  console.log(location);

  if (!errorLogin && newUserId) {
    return <Navigate to="/login" />;
  }

  return (
    <section className={s.auth}>
      <Container>
        <div className={s.box}>
          <div className={s.linksWrapper}>
            <Link to="/login">
              <h2 className={s.title}>Вхід</h2>
            </Link>
            <Link to="registration">
              <h2 className={s.title}>Реєстрація</h2>
            </Link>
          </div>
          {/* {location.pathname === '/registration' && <Register />} */}
          {/* {location.pathname === '/login' && <Login />} */}
          <Outlet />
          <Link to="/">Повернутися на головну</Link>
        </div>
      </Container>
    </section>
  );
};

export default AuthWrapper;
