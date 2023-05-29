import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import s from './Login.module.scss';

import Container from 'components/Shared/Container';
import TextField from 'components/Shared/TextField';
import { field } from 'components/Shared/TextField/fields';
import Button from 'components/Shared/Button';

import { clearNewUser } from 'redux/auth/auth-slice';
import { login } from 'redux/auth/auth-opetations';
import { getLogin } from 'redux/auth/auth-selectors';

const Login = () => {
  const dispatch = useDispatch();

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

  const isLogin = useSelector(getLogin);

  if (isLogin) {
    return <Navigate to="/" />;
  }

  return (
    <section className={s.login}>
      <Container>
        <div className={s.box}>
          <h2 className={s.title}>Вхід</h2>
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
        </div>
      </Container>
    </section>
  );
};

export default Login;
