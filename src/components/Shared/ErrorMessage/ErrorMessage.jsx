import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUserError } from 'redux/auth/auth-slice';
import { clearProductError } from 'redux/product/product-slice';
import { clearVerifyError } from 'redux/verifyEmail/verifyEmail-slice';

import Text from 'components/Shared/Text/Text';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './ErrorMessage.module.scss';

export default function ErrorMessage({ text, onDismiss }) {
  const dispatch = useDispatch();
  const [isDisplayed, setIsDisplayed] = useState(true);

  const handleDismissClick = () => {
    setIsDisplayed(false);
    if (typeof onDismiss === 'function') {
      onDismiss();
    }
    dispatch(clearUserError());
    dispatch(clearProductError());
    dispatch(clearVerifyError());
  };

  useEffect(() => {
    setIsDisplayed(true);
  }, [text]);

  if (!isDisplayed) {
    return null;
  }

  return (
    <div className={s.errorMessage}>
      <button className={s.dismissButton} onClick={handleDismissClick}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>
      <div className={s.boo}>
        <div className={s.face} id="face"></div>
      </div>
      <div className={s.shadow}></div>

      <h1 className={s.title}>Ups...</h1>
      <Text text={text} textClass="textError" />
    </div>
  );
}
