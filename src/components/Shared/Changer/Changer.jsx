import s from './Changer.module.scss';

const Changer = type => {
  let mainArray;
  switch (type) {
    case 'language':
      mainArray = ['UA', 'EN'];
      console.log(mainArray);
      break;
    case 'theme':
      mainArray = ['Light', 'Dark'];
      console.log(mainArray);
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
