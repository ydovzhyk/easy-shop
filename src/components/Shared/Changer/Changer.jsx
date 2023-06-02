import s from './Changer.module.scss';
import { fields } from './fields';

const Changer = ({ type }) => {
  let mainArray;
  switch (type) {
    case 'language':
      mainArray = fields.language;
      break;
    case 'theme':
      mainArray = fields.theme;
      break;
    default:
      break;
  }

  return (
    <ul className={s.changerList}>
      {mainArray.map(el => (
        <li key={el} className={s.changerItem}>
          <p className={s.changerText}>{el}</p>
          {/* <Button type="button" btnClass="languageButton" text={el}></Button> */}
        </li>
      ))}
    </ul>
  );
};

export default Changer;
