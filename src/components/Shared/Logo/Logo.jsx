import { Link } from 'react-router-dom';

import s from './Logo.module.scss';

const Logo = ({ className }) => {
  const boxClass = className ? `${s[className]}` : `${s.logoBox}`;
  const linkClass = className ? `${s[className]}` : `${s.logo}`;

  return (
    <>
      <div className={boxClass}>
        <Link to="/" className={linkClass}>
          EASYshop
        </Link>
      </div>
    </>
  );
};

export default Logo;
