// import { useDispatch } from 'react-redux';
import Button from 'components/Shared/Button';

import s from './LanguageChanger.module.scss';

const LanguageChanger = () => {
  // const dispatch = useDispatch();

  return (
    <ul className={s.languagesList}>
      {['UA', 'ENG'].map(el => (
        <li key={el} className="languageItem">
          <Button type="button" btnClass="languageButton" text={el}></Button>
        </li>
      ))}
    </ul>
  );
};

export default LanguageChanger;
