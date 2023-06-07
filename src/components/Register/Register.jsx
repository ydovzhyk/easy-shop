import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { register } from 'redux/auth/auth-opetations';
import { useDispatch, useSelector } from 'react-redux';

import s from './Register.module.scss';

import { field } from 'components/Shared/TextField/fields';
import TextField from 'components/Shared/TextField';
import Button from 'components/Shared/Button';

import { getError, getNewUserId } from 'redux/auth/auth-selectors';

import avatarImage from '../../images/Avatar/avatar.svg';

const Register = () => {
  const [userAvatar, setUserAvatar] = useState('');
  const dispatch = useDispatch();

  const errorLogin = useSelector(getError);

  const newUserId = useSelector(getNewUserId);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

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

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(userAvatar);
    const dataWithAvatar = { ...data, userAvatar: userAvatar };
    dispatch(register(dataWithAvatar));
    reset();
  };

  if (!errorLogin && newUserId) {
    return <Navigate to="/login" />;
  }

  return (
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
  );
};

export default Register;
