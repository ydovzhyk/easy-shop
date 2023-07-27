import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { updateUser } from 'redux/auth/auth-opetations';
import {
  getError,
  getLoadingUser,
  getLogin,
  getID,
  getNewMessage,
} from 'redux/auth/auth-selectors';
import {
  getLoadingProducts,
  getProductError,
} from 'redux/product/product-selectors';
import {
  getLoadingVerifyEmail,
  getErrorVerifyEmail,
} from 'redux/verifyEmail/verifyEmail-selectors';
import {
  getLoadingDialogue,
  getDialogueError,
} from 'redux/dialogue/dialogue-selectors';
import {
  getLoadingOtherUser,
  getOtherUserError,
} from 'redux/otherUser/otherUser-selectors';
import { getLoadingOrders, getOrderError } from 'redux/order/order-selectors';
import UserRoutes from './Routes/UserRoutes';
import Header from './Header';
import Footer from './Footer/Footer';
import BottomNavigation from './BottomNavigation';
import Loader from './Loader/Loader';
import ErrorMessage from './Shared/ErrorMessage/ErrorMessage';
import { useLocation } from 'react-router-dom';

export const App = () => {
  const isLogin = useSelector(getLogin);
  const userId = useSelector(getID);
  const newMessage = useSelector(getNewMessage);
  const authError = useSelector(getError);
  const productError = useSelector(getProductError);
  const verifyEmailError = useSelector(getErrorVerifyEmail);
  const dialogueError = useSelector(getDialogueError);
  const otherUserError = useSelector(getOtherUserError);
  const orderError = useSelector(getOrderError);
  const loadingUser = useSelector(getLoadingUser);
  const loadingProducts = useSelector(getLoadingProducts);
  const loadingVerify = useSelector(getLoadingVerifyEmail);
  const loadingDialogue = useSelector(getLoadingDialogue);
  const loadingOtherUser = useSelector(getLoadingOtherUser);
  const loadingOrder = useSelector(getLoadingOrders);
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const dispatch = useDispatch();
  const [errMessage, setErrMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const location = useLocation();
  const headerFooterHidden =
    location.pathname === '/login' || location.pathname === '/registration';

  useEffect(() => {
    const authData = JSON.parse(localStorage.getItem('easy-shop.authData'));
    if (authData && authData.accessToken) {
      const userData = {
        accessToken: authData.accessToken,
        refreshToken: authData.refreshToken,
        sid: authData.sid,
      };
      dispatch(updateUser(userData));
    } else {
      return;
    }
  }, [dispatch]);

  useEffect(() => {
    if (authError) {
      setErrMessage(authError);
    } else if (productError) {
      setErrMessage(productError);
    } else if (verifyEmailError) {
      setErrMessage(verifyEmailError);
    } else if (dialogueError) {
      setErrMessage(dialogueError);
    } else if (otherUserError) {
      setErrMessage(otherUserError);
    } else if (orderError) {
      setErrMessage(orderError);
    } else {
      setErrMessage('');
    }
  }, [
    authError,
    productError,
    verifyEmailError,
    dialogueError,
    otherUserError,
    orderError,
  ]);

  useEffect(() => {
    if (
      loadingUser ||
      loadingProducts ||
      loadingVerify ||
      loadingDialogue ||
      loadingOtherUser ||
      loadingOrder
    ) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [
    loadingUser,
    loadingProducts,
    loadingVerify,
    loadingDialogue,
    loadingOtherUser,
    loadingOrder,
  ]);

  // render last visited page
  useEffect(() => {
    const pageInfo = JSON.parse(localStorage.getItem('easy-shop-page-info'));
    const currentPath = location.pathname;

    if (pageInfo && pageInfo.lastVisitedPage && pageInfo.lastVisitedTime) {
      const currentTime = new Date().getTime();
      const timeDifference =
        (currentTime - parseInt(pageInfo.lastVisitedTime, 10)) / (1000 * 60);
      if (timeDifference > 120) {
        localStorage.removeItem('easy-shop-page-info');
        window.location.href = '/';
      }
    }

    const pageInfoToUpdate = {
      lastVisitedPage: currentPath,
      lastVisitedTime: new Date().getTime().toString(),
    };
    localStorage.setItem(
      'easy-shop-page-info',
      JSON.stringify(pageInfoToUpdate)
    );
  }, [location.pathname]);

  // Web Socket

  let socketRef = useRef(null);
  let intervalRef = useRef(null);
  useEffect(() => {
    const updateUserFunction = () => {
      const authData = JSON.parse(localStorage.getItem('easy-shop.authData'));
      if (authData && authData.accessToken) {
        const userData = {
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          sid: authData.sid,
        };
        dispatch(updateUser(userData));
      } else {
        return;
      }
    };

    if (isLogin && !socketRef.current) {
      console.log('Зайшли отримати нове зєднання');
      let uri = null;
      if (process.env.NODE_ENV === 'production') {
        uri = `ws://easy-shop-backend.herokuapp.com/?user=${userId}`;
      }
      if (process.env.NODE_ENV === 'development') {
        uri = `ws://localhost:5000/?user=${userId}`;
      }
      const socket = new WebSocket(uri);

      socket.onopen = () => {
        console.log("WebSocket з'єднання встановлено");
        socketRef.current = socket;

        const sendRequest = () => {
          const request = {
            type: 'check_updates_dialogue',
            userId: userId,
            newMessage: newMessage ? newMessage : 0,
          };
          socket.send(JSON.stringify(request));
        };

        // Відправити перший запит
        sendRequest();

        // Встановити інтервал для повторної відправки запиту кожні 30 секунд
        const intervalId = setInterval(sendRequest, 30000);
        intervalRef.current = intervalId;

        socket.onmessage = event => {
          const response = event.data.trim();
          console.log('Отримано повідомлення:', response);
          if (response === 'true') {
            updateUserFunction();
          }
        };

        // Закриття WebSocket з'єднання та очищення інтервалу при закритті компонента
        return () => {
          clearInterval(intervalId);
          socket.close();
        };
      };

      socket.onclose = () => {
        console.log("WebSocket з'єднання закрито");
      };
    }
  }, [dispatch, isLogin, userId, newMessage]);

  useEffect(() => {
    if (!isLogin && socketRef.current) {
      console.log('Закриваємо зєднання');
      clearInterval(intervalRef.current);
      socketRef.current.close();
      socketRef.current = null;
      intervalRef.current = null;
    }
  }, [isLogin]);

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {errMessage !== '' && <ErrorMessage text={`${errMessage}`} />}
      {!headerFooterHidden && <Header />}
      <main style={{ flexGrow: 1 }}>
        {isLoaded && <Loader />}
        <UserRoutes />
      </main>
      {!headerFooterHidden && !isDesctop && <BottomNavigation />}
      {!headerFooterHidden && <Footer />}
    </div>
  );
};
