import { useForm, Controller } from 'react-hook-form';
import { NavLink, Navigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FcGoogle } from 'react-icons/fc';

import { clearNewUser, clearUserError } from 'redux/auth/auth-slice';
import { login } from 'redux/auth/auth-opetations';
import { getLogin, getError } from 'redux/auth/auth-selectors';

import Container from 'components/Shared/Container';
import ErrorMessage from 'components/Shared/ErrorMessage/ErrorMessage';
import Text from 'components/Shared/Text/Text';
import TextField from 'components/Shared/TextField';
import { field } from 'components/Shared/TextField/fields';
import Button from 'components/Shared/Button';

import s from './Login.module.scss';

const Login = () => {
  const errorLogin = useSelector(getError);
  const isLogin = useSelector(getLogin);
  const location = useLocation();
  const dispatch = useDispatch();
  // const REACT_APP_API_URL = 'http://localhost:4000';
  const REACT_APP_API_URL = 'https://easy-shop-backend.herokuapp.com';

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(login(data));
    reset();
    dispatch(clearNewUser());
  };

  const googleText =
    location.pathname === '/login'
      ? 'Увійти швидко з Google'
      : 'Зареєструватись швидко з Google';

  const getClassName = ({ isActive }) => {
    return isActive ? `${s.authLink} ${s.activeLink}` : s.authLink;
  };

  if (isLogin) {
    return <Navigate to="/" />;
  }

  const resetError = () => {
    dispatch(clearUserError());
  };

  return (
    <section className={s.auth}>
      <Container>
        <div className={s.box}>
          <div className={s.linksWrapper}>
            <NavLink className={getClassName} to="/login" end>
              <h2 className={s.title}>Вхід</h2>
            </NavLink>
            <NavLink className={getClassName} to="/registration">
              <h2 className={s.title}>Реєстрація</h2>
            </NavLink>
          </div>
          <Text textClass="google-text" text={googleText} />
          <a href={`${REACT_APP_API_URL}/google`} className={s.googleBtn}>
            <FcGoogle size={24} />
            Google
          </a>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
              control={control}
              name="email"
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  control={control}
                  handleChange={onChange}
                  {...field.email}
                />
              )}
            />
            <Controller
              control={control}
              name="password"
              rules={{ required: true, minLength: 8, maxLength: 30 }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  control={control}
                  handleChange={onChange}
                  {...field.password}
                />
              )}
            />
            <div className={s.wrap}>
              <Button text="Ввійти" btnClass="btnLight" />
            </div>
          </form>
          <Link className={s.linkHome} to="/">
            Повернутися на головну
          </Link>
        </div>
        {errorLogin && (
          <ErrorMessage text={`${errorLogin}`} onDismiss={resetError} />
        )}
      </Container>
    </section>
  );
};

export default Login;
