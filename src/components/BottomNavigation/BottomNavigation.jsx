import { NavLink } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { BsSuitHeart } from 'react-icons/bs';
import { HiPlus } from 'react-icons/hi';
import { SlBasket } from 'react-icons/sl';
import { HiOutlineUser } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';
import s from './BottomNavigation.module.scss';

const BottomNavigation = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <nav className={s.navigationBottom}>
      <div className={s.containerBottom}>
        <NavLink to="/login">
          <SlBasket size={isMobile ? 25 : 30} />
        </NavLink>
        <NavLink to="/">
          <BsSuitHeart size={isMobile ? 25 : 30} />
        </NavLink>
        <NavLink to="/">
          <div className={s.circleBox}>
            <HiPlus size={isMobile ? 25 : 30} />
          </div>
        </NavLink>
        <NavLink to="/">
          <BiMessageDetail size={isMobile ? 25 : 30} />
        </NavLink>
        <NavLink to="/">
          <HiOutlineUser size={isMobile ? 25 : 30} />
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavigation;
