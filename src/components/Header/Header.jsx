import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import UserInfo from 'components/UserInfo/UserInfo';
import { getLogin } from 'redux/auth/auth-selectors';
import { BiSearchAlt } from 'react-icons/bi';
import { HiOutlineBars4 } from 'react-icons/hi2';
import { AiOutlineArrowLeft } from 'react-icons/ai';

import s from './Header.module.scss';
import HeaderForm from 'components/HeaderForm/HeaderForm';
import SwitchBtn from 'components/Shared/SwitchBtn/SwitchBtn';
import Logo from 'components/Shared/Logo';
import Button from 'components/Shared/Button';

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();
  const navigate = useNavigate();
  const getClassName = ({ isActive }) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };
  const isLogin = useSelector(getLogin);

  const handleSearchBtnClick = () => {
    setShowForm(!showForm);
  };

  const handleAddProduct = () => {
    if (isLogin) {
      navigate('/add-product');
    } else {
      navigate('/login');
    }
  };

  return (
    <header className={s.header}>
      <div className={s.containerTop}>
        {!isDesktop && (
          <>
            {showForm && (
              <div style={{ display: 'flex', width: '100%' }}>
                <Button
                  type="button"
                  btnClass="burgerButton"
                  handleClick={handleSearchBtnClick}
                  text={<AiOutlineArrowLeft size={isMobile ? 15 : 20} />}
                ></Button>
                <HeaderForm />
              </div>
            )}
            {!showForm && (
              <>
                <div className={s.navTopContainer}>
                  <Button
                    type="button"
                    btnClass="burgerButton"
                    text={<HiOutlineBars4 size={isMobile ? 25 : 30} />}
                  ></Button>
                  <Logo />
                </div>
                <div className={s.btnWrapper}>
                  <Button
                    type="button"
                    btnClass="searchBtn"
                    handleClick={handleSearchBtnClick}
                    text={<BiSearchAlt size={isMobile ? 25 : 30} />}
                  ></Button>
                </div>
              </>
            )}
          </>
        )}

        {isDesktop && (
          <>
            <Logo />
            <HeaderForm />
            <Button
              text="Додати товар"
              btnClass="btnLight"
              handleClick={handleAddProduct}
            />
            <UserInfo />
          </>
        )}
      </div>

      {isLogin && (
        <div className={s.containerBottom}>
          <div>
            <NavLink
              className={getClassName({
                isActive: location.pathname === '/restaurants',
              })}
              to="/restaurants"
            >
              Жінкам
            </NavLink>
            <NavLink
              className={getClassName({
                isActive: location.pathname === '/supermarkets',
              })}
              to="/supermarkets"
            >
              Чоловікам
            </NavLink>
            <NavLink
              className={getClassName({
                isActive: location.pathname === '/health',
              })}
              to="/health"
            >
              Дитячі товари
            </NavLink>
          </div>
          <div className={s.switchMainBox}>
            <SwitchBtn type="language" />
            <SwitchBtn type="theme" />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
