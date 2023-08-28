import { BsGithub, BsLinkedin } from 'react-icons/bs';

import Container from 'components/Shared/Container';
import developers from './developersList';
import s from './Developers.module.scss';
import Text from 'components/Shared/Text/Text';

const Developers = () => {
  return (
    <section className={s.developersContainer}>
      <Container>
        <h1 className={s.developersHeading}>Розробники сайту</h1>
        <ul className={s.developersList}>
          {developers.map(
            ({ devName, devPhoto, gitHubLink, linkedInLink, email }) => (
              <li className={s.listItem} key={devName}>
                <div className={s.avatarWrapper}>
                  <img src={devPhoto} alt={`developer ${devName}`} />
                </div>
                <div className={s.bottomContentWrapper}>
                  <Text text={devName} textClass="cardMainText" />
                  <a
                    href="mailto:"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={s.contactLinkContent}
                  >
                    {email}
                  </a>
                  <div className={s.bottomSocialContentWrapper}>
                    <a
                      href={gitHubLink}
                      target="_blank"
                      rel="noreferrer noopener nofollow"
                      className={s.socialLink}
                    >
                      <BsGithub size={35} className={s.socialIcon} />
                    </a>
                    <a
                      href={linkedInLink}
                      target="_blank"
                      rel="noreferrer noopener nofollow"
                    >
                      <BsLinkedin size={35} className={s.socialIcon} />
                    </a>
                  </div>
                </div>
              </li>
            )
          )}
        </ul>
      </Container>
    </section>
  );
};

export default Developers;
