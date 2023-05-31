import { Link } from 'react-router-dom';

import s from './Logo.module.scss';

const Logo = () => {
  return (
    <>
      <div className={s.logoBox}>
        <Link to="/" className={s.logo}>
          EASYshop
        </Link>
      </div>
    </>
  );
};

export default Logo;
