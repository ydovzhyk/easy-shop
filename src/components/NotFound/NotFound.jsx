import { Link } from 'react-router-dom';
import Button from 'components/Shared/Button';
import s from './NotFound.module.scss';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearUserError } from 'redux/auth/auth-slice';
import { clearProductError } from 'redux/product/product-slice';
import { clearVerifyError } from 'redux/verifyEmail/verifyEmail-slice';
const NotFound = ({
  textTop,
  textBottom,
  backLink,
  classComp,
  onDismiss,
  text,
}) => {
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
    <div className={s[classComp]}>
      <button className={s.dismissButton} onClick={handleDismissClick}>
        <FontAwesomeIcon icon={faTimes} size="lg" />
      </button>
      <div className={s.boo}>
        <div className={s.face} id="face"></div>
      </div>
      <div className={s.shadow}></div>

      <h1 className={s.title}>Ой!</h1>
      <p className={s.txt}>
        {textTop}
        <br />
        {textBottom}
      </p>

      {backLink && (
        <Link to={backLink}>
          <Button text="Повернутися" btnClass="btnLight" />
        </Link>
      )}
    </div>
  );
};

export default NotFound;
