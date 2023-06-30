import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { register } from 'redux/auth/auth-opetations';
import { NavLink, Navigate, useLocation, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { getError, getNewUserId } from 'redux/auth/auth-selectors';
import { clearUserError } from 'redux/auth/auth-slice';

import { field } from 'components/Shared/TextField/fields';
import TextField from 'components/Shared/TextField';
import Button from 'components/Shared/Button';
import Container from 'components/Shared/Container';
import ErrorMessage from 'components/Shared/ErrorMessage/ErrorMessage';
import Text from 'components/Shared/Text/Text';

import avatarImage from '../../images/Avatar/avatar.svg';

import s from './Register.module.scss';

const Register = () => {
  const errorLogin = useSelector(getError);
  const newUserId = useSelector(getNewUserId);
  const location = useLocation();
  const dispatch = useDispatch();
  const [userAvatar, setUserAvatar] = useState('');
  // const REACT_APP_API_URL = 'http://localhost:4000';
  const REACT_APP_API_URL = 'https://easy-shop-backend.herokuapp.com';

  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch(avatarImage);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserAvatar(reader.result);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.log('Error loading image:', error);
      }
    };

    loadImage();
  }, []);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    const dataWithAvatar = { ...data, userAvatar: userAvatar };
    dispatch(register(dataWithAvatar));
    reset();
  };

  const googleText =
    location.pathname === '/login'
      ? 'Увійти швидко з Google'
      : 'Зареєструватись швидко з Google';

  const getClassName = ({ isActive }) => {
    return isActive ? `${s.authLink} ${s.activeLink}` : s.authLink;
  };

  if (!errorLogin && newUserId) {
    return <Navigate to="/login" />;
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
              name="username"
              rules={{ required: true, maxLength: 16 }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  value={value}
                  control={control}
                  handleChange={onChange}
                  {...field.user}
                />
              )}
            />
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
              <Button text="Реєстрація" btnClass="btnLight" />
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

export default Register;
