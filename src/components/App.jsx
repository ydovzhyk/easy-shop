import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { updateUser } from 'redux/auth/auth-operations';
import { getAllDialoguesData } from 'redux/dialogue/dialogue-operations';
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
  getStatusDialogueList,
} from 'redux/dialogue/dialogue-selectors';
import {
  getLoadingOtherUser,
  getOtherUserError,
} from 'redux/otherUser/otherUser-selectors';
import { getLoadingReviews } from 'redux/review/review-selectors';
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
  const loadingReview = useSelector(getLoadingReviews);
  const statusDialogue = useSelector(getStatusDialogueList);
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const dispatch = useDispatch();
  const [errMessage, setErrMessage] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isConnectionWS, setIsConnectionWS] = useState(false);

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
      loadingOrder ||
      loadingReview
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
    loadingReview,
  ]);

  // render last visited page
  useEffect(() => {
    const pageInfo = JSON.parse(localStorage.getItem('easy-shop-page-info'));
    const currentPath = location.pathname;
    const currentPathSearch = location.search;

    if (pageInfo && pageInfo.lastVisitedPage && pageInfo.lastVisitedTime) {
      const currentTime = new Date().getTime();
      const timeDifference =
        (currentTime - parseInt(pageInfo.lastVisitedTime, 10)) / (1000 * 60);
      if (timeDifference > 120) {
        localStorage.removeItem('easy-shop-page-info');
        window.location.href = '/';
      }
    }

    if (currentPathSearch && process.env.NODE_ENV === 'development') {
      const pageInfoToUpdate = {
        lastVisitedPage: currentPath + currentPathSearch,
        lastVisitedTime: new Date().getTime().toString(),
      };
      localStorage.setItem(
        'easy-shop-page-info',
        JSON.stringify(pageInfoToUpdate)
      );
    }
    if (currentPathSearch && process.env.NODE_ENV === 'production') {
      const pageInfoToUpdate = {
        lastVisitedPage: currentPathSearch,
        lastVisitedTime: new Date().getTime().toString(),
      };
      localStorage.setItem(
        'easy-shop-page-info',
        JSON.stringify(pageInfoToUpdate)
      );
    }
    if (!currentPathSearch) {
      const pageInfoToUpdate = {
        lastVisitedPage: currentPath,
        lastVisitedTime: new Date().getTime().toString(),
      };
      localStorage.setItem(
        'easy-shop-page-info',
        JSON.stringify(pageInfoToUpdate)
      );
    }
  }, [location.pathname, location.search]);

  // Web Socket
  let socketRef = useRef(null);
  let intervalRef = useRef(null);
  let uri = null;
  if (process.env.NODE_ENV === 'production') {
    uri = `wss://easy-shop-backend.herokuapp.com/?user=${userId}`;
  }
  if (process.env.NODE_ENV === 'development') {
    uri = `wss://easy-shop-backend.herokuapp.com/?user=${userId}`;
  }
  // if (process.env.NODE_ENV === 'development') {
  //   uri = `ws://localhost:4000/?user=${userId}`;
  // }

  useEffect(() => {
    const checkAndStartConnection = () => {
      if (
        !socketRef.current ||
        socketRef.current.readyState === WebSocket.CLOSED
      ) {
        socketRef.current = new WebSocket(uri);

        socketRef.current.onopen = () => {
          console.log("WebSocket з'єднання встановлено");
          setIsConnectionWS(true);
        };
        socketRef.current.onclose = () => {
          console.log("WebSocket з'єднання закрито");
          setIsConnectionWS(false);
        };

        // Повертаємо функцію очищення при розмонтуванні компонента
        return () => {
          clearInterval(intervalRef.current);
          socketRef.current.close();
        };
      }
    };

    if (!isLogin || socketRef.current) {
      return;
    }
    const connectionInterval = setInterval(() => {
      checkAndStartConnection();
    }, 10000);

    return () => {
      clearInterval(connectionInterval);
    };
  }, [isLogin, uri]);

  useEffect(() => {
    const updateUserFunction = () => {
      const authData = JSON.parse(localStorage.getItem('easy-shop.authData'));
      if (authData && authData.accessToken) {
        const userData = {
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
          sid: authData.sid,
        };

        const getUserPromise = dispatch(updateUser(userData));
        const getDialoguesDataPromise = dispatch(
          getAllDialoguesData({ statusDialogue })
        );

        Promise.all([getDialoguesDataPromise, getUserPromise]);
      } else {
        return;
      }
    };

    const sendRequest = newM => {
      if (socketRef.current.readyState === WebSocket.OPEN) {
        const request = {
          type: 'check_updates_dialogue',
          userId: userId,
          newMessage: newM ? newM : 0,
        };
        socketRef.current.send(JSON.stringify(request));
      } else {
        return;
      }
    };

    if (
      isLogin &&
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      // Встановити інтервал для повторної відправки запиту кожні 30 секунд
      intervalRef.current = setInterval(() => {
        sendRequest(newMessage);
      }, 30000);

      socketRef.current.onmessage = event => {
        const response = event.data.trim();
        if (response === 'true') {
          updateUserFunction();
        }
      };
    }
  }, [dispatch, isLogin, userId, newMessage, isConnectionWS, statusDialogue]);

  useEffect(() => {
    if (
      !isLogin &&
      socketRef.current &&
      socketRef.current.readyState === WebSocket.OPEN
    ) {
      clearInterval(intervalRef.current);
      socketRef.current.close();
      socketRef.current = null;
      intervalRef.current = null;
      setIsConnectionWS(false);
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
