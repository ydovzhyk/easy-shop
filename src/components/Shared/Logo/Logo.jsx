import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { resetHeaderForm } from 'redux/product/product-slice';

import s from './Logo.module.scss';

const Logo = ({ className }) => {
  const boxClass = className ? `${s[className]}` : `${s.logoBox}`;
  const linkClass = className ? `${s[className]}` : `${s.logo}`;
  const dispatch = useDispatch();

  const handlerClick = () => {
    window.sessionStorage.clear();
    dispatch(resetHeaderForm());
  };

  return (
    <>
      <div className={boxClass}>
        <Link to="/" onClick={handlerClick} className={linkClass}>
          EASYshop
        </Link>
      </div>
    </>
  );
};

export default Logo;
