import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import s from './Login.module.scss';

import Container from 'components/Shared/Container';
import TextField from 'components/Shared/TextField';
import { field } from 'components/Shared/TextField/fields';
import Button from 'components/Shared/Button';

import { getError } from 'redux/auth/auth-selectors';
import { clearNewUser } from 'redux/auth/auth-slice';
import { login } from 'redux/auth/auth-opetations';

const Login = () => {
  const dispatch = useDispatch();

  const errorLogin = useSelector(getError);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    dispatch(clearNewUser());
    // eslint-disable-next-line
  }, []);

  const onSubmit = (data, e) => {
    e.preventDefault();
    dispatch(login(data));
    reset();
  };

  return (
    <section className={s.login}>
      <Container>
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
            <Button text="Ввійти" btnClass="btn" />
          </div>
        </form>
      </Container>
    </section>
  );
};

export default Login;
