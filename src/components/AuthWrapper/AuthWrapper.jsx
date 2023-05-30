import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';

import s from './AuthWrapper.module.scss';

import Container from 'components/Shared/Container';

import { getError, getNewUserId } from 'redux/auth/auth-selectors';
import Text from 'components/Shared/Text/Text';
// import Register from 'components/Register/Register';
// import Login from 'components/Login/Login';

const AuthWrapper = () => {
  const errorLogin = useSelector(getError);

  const newUserId = useSelector(getNewUserId);

  const location = useLocation();
  console.log(location);
  const googleText =
    location.pathname === '/login'
      ? 'Увійти швидко з Google'
      : 'Зареєструватись швидко з Google';

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
          <Text textClass="google-text" text={googleText} />
          <a
            href="https://ydovzhyk.github.io/easy-shop/"
            className={s.googleBtn}
          >
            <FcGoogle size={24} />
            Google
          </a>
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
