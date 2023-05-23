import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import ld from '../../../images/logo/logo.svg';
import s from './Logo.module.scss';

const Logo = () => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      {isMobile && (
        <Link to="/">
          <div className={s.logoBackground}>
            <img src={ld} alt="web-site logo" width="95" />
          </div>
        </Link>
      )}

      {isTablet && (
        <Link to="/">
          <div className={s.logoBackground}>
            <img src={ld} alt="web-site logo" width="115" />
          </div>
        </Link>
      )}

      {isDesctop && (
        <Link to="/">
          <div className={s.logoBackground}>
            <img src={ld} alt="web-site logo" width="115" />
          </div>
        </Link>
      )}
    </>
  );
};

export default Logo;
