import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateUser } from 'redux/auth/auth-operations';
import { verifyConfirmation } from 'redux/verifyEmail/verifyEmail-slice';
import { getVerifyMessage } from 'redux/verifyEmail/verifyEmail-selectors';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import Container from 'components/Shared/Container';
import Default from 'components/Default/Default';

const Home = () => {
  const dispatch = useDispatch();
  const isMessage = useSelector(getVerifyMessage);
  const navigate = useNavigate();

  let siteUrl;
  if (process.env.NODE_ENV === 'production') {
    siteUrl = 'https://ydovzhyk.github.io/easy-shop/';
  } else {
    siteUrl = 'http://localhost:3000';
  }

  //google auth
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
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
      window.location.assign(siteUrl);
    }
    if (message) {
      dispatch(verifyConfirmation(message));
      setTimeout(() => {
        window.location.assign(siteUrl);
      }, 5000);
    } else {
      return;
    }
  }, [dispatch, navigate, siteUrl]);

  return (
    <Container>
      <Default />
      {isMessage && <MessageWindow text={isMessage} />}
    </Container>
  );
};

export default Home;
