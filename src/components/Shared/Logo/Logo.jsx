import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

// import ld from '../../../images/logo/logo.svg';
import s from './Logo.module.scss';

const Logo = () => {
  const isDesctop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1279 });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <>
      {isMobile && (
        <Link to="/" className={s.logo}>
          EASYshop
          {/* <div className={s.logoBackground}>
            <img src={ld} alt="web-site logo" width="95" />
          </div> */}
        </Link>
      )}

      {isTablet && (
        <Link to="/" className={s.logo}>
          EASYshop
          {/* <div className={s.logoBackground}> */}
          {/* <img src={ld} alt="web-site logo" width="115" /> */}
          {/* </div> */}
        </Link>
      )}

      {isDesctop && (
        <Link to="/" className={s.logo}>
          {/* <h1 className={s.logoBackground}> */}
          EASYshop
          {/* <img src={ld} alt="web-site logo" width="115" /> */}
          {/* </h1> */}
        </Link>
      )}
    </>
  );
};

export default Logo;
