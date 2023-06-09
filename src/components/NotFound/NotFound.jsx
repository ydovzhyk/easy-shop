import { Link } from 'react-router-dom';
import Button from 'components/Shared/Button';
import s from './NotFound.module.scss';

const NotFound = ({ textTop, textBottom, backLink, classComp }) => {
  return (
    <div className={s[classComp]}>
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
