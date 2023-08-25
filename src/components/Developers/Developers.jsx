import Container from 'components/Shared/Container';
import s from './Developers.module.scss';
// import Avatar from 'components/Profile/Avatar/Avatar';

const developers = [
  {
    devName: 'Юрій Довжик',
    devPhoto: 'https://avatars.githubusercontent.com/u/48929257?v=4',
    gitHubLink: 'https://github.com/ydovzhyk',
  },
  {
    devName: 'Наталія Гринук',
    devPhoto: 'https://avatars.githubusercontent.com/u/92783918?v=4',
    gitHubLink: 'https://github.com/NataliiaHrynchuk',
  },
  {
    devName: 'Катерина Клещ',
    devPhoto: 'https://avatars.githubusercontent.com/u/99125819?v=4',
    gitHubLink: 'https://github.com/kotyamur',
  },
  {
    devName: 'Юлія Зозуля',
    devPhoto: 'https://avatars.githubusercontent.com/u/98358870?v=4',
    gitHubLink: 'https://github.com/Immayou',
  },
  {
    devName: 'Марина Петренко',
    devPhoto: 'https://avatars.githubusercontent.com/u/99042644?v=4',
    gitHubLink: 'https://github.com/MariOkner',
  },
  {
    devName: 'Юлія Дольнікова',
    devPhoto: 'https://avatars.githubusercontent.com/u/98531699?v=4',
    gitHubLink: 'https://github.com/Dolnikova',
  },
];

const Developers = () => {
  return (
    <section className={s.developersContainer}>
      <Container>
        <h1 className={s.developersHeading}>Розробники сайту</h1>
        <ul className={s.developersList}>
          {developers.map(({ devName, devPhoto, gitHubLink }) => (
            <li className={s.listItem} key={devName}>
              <div className={s.avatarWrapper}>
                {/* <Avatar src={devPhoto} /> */}
                <img src={devPhoto} alt={`developer ${devName}`} />
              </div>
              <p>{devName}</p>
              <a href={gitHubLink}>Посилання на GitHub</a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Developers;
