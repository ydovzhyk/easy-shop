import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from 'redux/auth/auth-slice';

import Text from 'components/Shared/Text/Text';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './ErrorMessage.module.scss';

export default function Carusel({ text, onDismiss }) {
  const dispatch = useDispatch();
  const [isDisplayed, setIsDisplayed] = useState(true);

  const handleDismissClick = () => {
    setIsDisplayed(false);
    if (typeof onDismiss === 'function') {
      onDismiss();
    }
    dispatch(clearError());
  };

  useEffect(() => {
    setIsDisplayed(true);
  }, [text]);

  if (!isDisplayed) {
    return null;
  }

  return <div className={s.errorMessage}></div>;
}
