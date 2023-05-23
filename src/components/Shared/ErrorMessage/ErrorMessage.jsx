import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from 'redux/auth/auth-slice';

import Text from 'components/Shared/Text/Text';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './ErrorMessage.module.scss';

export default function ErrorMessage(data) {
  const dispatch = useDispatch();
  const [isDisplayed, setIsDisplayed] = useState(true);

  const handleDismissClick = () => {
    setIsDisplayed(false);
    dispatch(clearError());
  };

  useEffect(() => {
    setIsDisplayed(true);
  }, [data]);

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
      <Text text={`${data.text}`} textClass="textError" />
    </div>
  );
}
