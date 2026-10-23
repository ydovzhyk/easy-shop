import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { verifyConfirmation } from 'redux/verifyEmail/verifyEmail-slice';
import { getVerifyMessage } from 'redux/verifyEmail/verifyEmail-selectors';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import Container from 'components/Shared/Container';
import Default from 'components/Default/Default';

const Home = () => {
  const dispatch = useDispatch();
  const isMessage = useSelector(getVerifyMessage);
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (!message) return undefined;

    dispatch(verifyConfirmation(message));
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);
    return () => clearTimeout(timer);
  }, [dispatch, navigate]);

  return (
    <Container>
      <Default />
      {isMessage && <MessageWindow text={isMessage} />}
    </Container>
  );
};

export default Home;
