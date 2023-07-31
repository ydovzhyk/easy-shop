import { useEffect, useState } from 'react';

import { NavLink, useLocation } from 'react-router-dom';

import Container from 'components/Shared/Container/Container';
import UserProfileInfo from 'components/Profile/UserProfileInfo/UserProfileInfo';

import s from './UserSellingInfo.module.scss';

const UserSellingInfo = () => {
  const location = useLocation().pathname;

  const [isWares, setIsWares] = useState(false);
  const [isReviews, setIsReviews] = useState(false);
  const [isAbout, setIsAbout] = useState(false);

  useEffect(() => {
    setIsWares(
      location === '/profile' || location === '/profile/mywares' ? true : false
    );
    // setIsWares(
    //   location.includes('wares') || location.includes('members') ? true : false
    // );
    setIsReviews(location.includes('reviews') ? true : false);
    setIsAbout(location.includes('about') ? true : false);
  }, [location]);
  return (
    <>
      <section className={s.profileavatar}>
        <UserProfileInfo />
      </section>
      <section>
        <Container>
          <ul className={s.list}>
            <li className={s.item}>
              <NavLink
                className={s.navlink}
                to="wares"
                style={() => {
                  return {
                    background: isWares ? 'var(--bg-footer-header)' : 'inherit',
                  };
                }}
              >
                Товари
                <span className={s.rightvalue}>10</span>
              </NavLink>
            </li>
            <li className={s.item}>
              <NavLink
                className={s.navlink}
                to="reviews"
                style={() => {
                  return {
                    background: isReviews
                      ? 'var(--bg-footer-header)'
                      : 'inherit',
                  };
                }}
              >
                Відгуки
                <span className={s.rightvalue}>10</span>
              </NavLink>
            </li>
            <li className={s.item}>
              <NavLink
                className={s.navlink}
                to="about"
                style={() => {
                  return {
                    background: isAbout ? 'var(--bg-footer-header)' : 'inherit',
                  };
                }}
              >
                Про себе
              </NavLink>
            </li>
          </ul>
        </Container>
      </section>
    </>
  );
};

export default UserSellingInfo;
