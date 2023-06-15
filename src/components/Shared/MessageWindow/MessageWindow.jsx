import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearMessage } from 'redux/product/product-slice';
import { clearUserMessage } from 'redux/auth/auth-slice';

import Text from 'components/Shared/Text/Text';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './MessageWindow.module.scss';

export default function MessageWindow({ text, onDismiss }) {
  const dispatch = useDispatch();
  const [isDisplayed, setIsDisplayed] = useState(true);

  const handleDismissClick = () => {
    setIsDisplayed(false);
    if (typeof onDismiss === 'function') {
      onDismiss();
    }
    dispatch(clearMessage());
    dispatch(clearUserMessage());
  };

  useEffect(() => {
    setIsDisplayed(true);

    const timeout = setTimeout(() => {
      setIsDisplayed(false);
      dispatch(clearMessage());
      dispatch(clearUserMessage());
    }, 3000);

    return () => clearTimeout(timeout);
  }, [text, dispatch]);

  if (!isDisplayed) {
    return null;
  }
  // const dispatch = useDispatch();
  // const [isDisplayed, setIsDisplayed] = useState(true);

  // const handleDismissClick = () => {
  //   setIsDisplayed(false);
  //   if (typeof onDismiss === 'function') {
  //     onDismiss();
  //   }
  //   dispatch(clearMessage());
  // };

  // useEffect(() => {
  //   setIsDisplayed(true);
  // }, [text]);

  // if (!isDisplayed) {
  //   return null;
  // }

  return (
    <div className={s.messageWindow}>
      <button className={s.dismissButton} onClick={handleDismissClick}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>
      <div className={s.boo}>
        <div className={s.face} id="face"></div>
      </div>
      <div className={s.shadow}></div>
      <Text text={text} textClass="textMessage" />
    </div>
  );
}
