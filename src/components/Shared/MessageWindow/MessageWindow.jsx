import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearMessage } from 'redux/product/product-slice';
import { clearUserMessage } from 'redux/auth/auth-slice';

import Text from 'components/Shared/Text/Text';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import s from './MessageWindow.module.scss';

export default function MessageWindow({
  text,
  onDismiss,
  confirmButtons,
  onConfirm,
}) {
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

    if (!confirmButtons) {
      const timeout = setTimeout(() => {
        setIsDisplayed(false);
        dispatch(clearMessage());
        dispatch(clearUserMessage());
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [text, dispatch, confirmButtons]);

  if (!isDisplayed) {
    return null;
  }

  const handleConfirmClick = choice => {
    setIsDisplayed(false);
    if (typeof onConfirm === 'function') {
      onConfirm(choice);
    }
  };

  return (
    <div className={s.messageWindow}>
      {!confirmButtons && (
        <button className={s.dismissButton} onClick={handleDismissClick}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </button>
      )}
      <div className={s.boo}>
        <div className={s.face} id="face"></div>
      </div>
      <div className={s.shadow}></div>
      {confirmButtons ? (
        <div className={s.confirmButtons}>
          <Text
            text="Ви впевнені, що хочете видалити об'яву?"
            textClass="textMessageBtn"
          />
          <div className={s.ButtonsBlock}>
            <button
              className={s.btnYes}
              onClick={() => handleConfirmClick('yes')}
            >
              Так
            </button>
            <button
              className={s.btnNo}
              onClick={() => handleConfirmClick('no')}
            >
              Ні
            </button>
          </div>
        </div>
      ) : (
        <Text text={text} textClass="textMessage" />
      )}
    </div>
  );
}
