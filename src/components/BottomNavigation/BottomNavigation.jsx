import { NavLink } from 'react-router-dom';
import { BsSuitHeart } from 'react-icons/bs';
import { HiPlus } from 'react-icons/hi';
import { SlHome } from 'react-icons/sl';
import { HiOutlineUser } from 'react-icons/hi';
import { BiMessageDetail } from 'react-icons/bi';
import s from './BottomNavigation.module.scss';

const BottomNavigation = () => {
  return (
    <nav className={s.navigationBottom}>
      <div className={s.containerBottom}>
        <NavLink to="/login">
          <SlHome size={25} />
        </NavLink>
        <NavLink to="/">
          <BsSuitHeart size={25} />
        </NavLink>
        <NavLink to="/">
          <div className={s.circleBox}>
            <HiPlus size={25} />
          </div>
        </NavLink>
        <NavLink to="/">
          <BiMessageDetail size={25} />
        </NavLink>
        <NavLink to="/">
          <HiOutlineUser size={25} />
        </NavLink>
      </div>
    </nav>
  );
};

export default BottomNavigation;
