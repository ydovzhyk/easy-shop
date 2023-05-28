import Button from 'components/Shared/Button';

import s from './LanguageChanger.module.scss';

const LanguageChanger = () => {
  return (
    <ul className={s.languagesList}>
      {['UA', 'EN'].map(el => (
        <li key={el} className={s.languageItem}>
          <Button type="button" btnClass="languageButton" text={el}></Button>
        </li>
      ))}
    </ul>
  );
};

export default LanguageChanger;
