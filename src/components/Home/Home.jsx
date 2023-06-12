import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { updateUser } from 'redux/auth/auth-opetations';
import Container from 'components/Shared/Container';
import Default from 'components/Default/Default';

import s from './Home.module.scss';

const Home = () => {
  const dispatch = useDispatch();

  //google auth
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');
    const sid = urlParams.get('sid');
    if (accessToken) {
      const userData = {
        accessToken: accessToken,
        refreshToken: refreshToken,
        sid: sid,
      };
      dispatch(updateUser(userData));
      localStorage.setItem('easy-shop.authData', JSON.stringify(userData));
    } else {
      return;
    }
  }, [dispatch]);

  return (
    <section className={s.home}>
      <Container>
        <Default />
      </Container>
    </section>
  );
};

export default Home;
