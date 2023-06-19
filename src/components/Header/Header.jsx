import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import UserInfo from 'components/UserInfo/UserInfo';
import { getLogin } from 'redux/auth/auth-selectors';
import { BiSearchAlt } from 'react-icons/bi';
import { HiOutlineBars4 } from 'react-icons/hi2';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { VscAdd } from 'react-icons/vsc';
import s from './Header.module.scss';
import HeaderForm from 'components/HeaderForm/HeaderForm';
import SwitchBtn from 'components/Shared/SwitchBtn/SwitchBtn';
import Logo from 'components/Shared/Logo';
import Button from 'components/Shared/Button';
import { Catalog } from 'components/DropDownMenu/Catalog';
import menuItems from 'components/DropDownMenu/menuItems';
import navItems from './navItems';
import { ModalCatalog } from 'components/DropDownMenu/ModalCatalog';

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  const [isModalCatalogOpen, setIsModalCatalogOpen] = useState(false);
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const location = useLocation();

  const getClassName = ({ isActive }) => {
    return isActive ? `${s.link} ${s.active}` : s.link;
  };
  const isLogin = useSelector(getLogin);
  const handleModalCatalogOpen = () => {
    setIsModalCatalogOpen(true);
  };
  const handleSearchBtnClick = () => {
    setShowForm(!showForm);
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
                />
                <HeaderForm />
              </div>
            )}
            {!showForm && (
              <>
                <div className={s.navTopContainer}>
                  <Button
                    type="button"
                    btnClass="burgerButton"
                    handleClick={handleModalCatalogOpen}
                    text={<HiOutlineBars4 size={30} />}
                  />
                  {isModalCatalogOpen && (
                    <ModalCatalog closeModal={setIsModalCatalogOpen} />
                  )}
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
            <NavLink
              className={({ isActive }) =>
                `${isActive ? s.activeBtn : s.btnLight}`
              }
              to={isLogin ? '/add-product' : '/login'}
            >
              <VscAdd size={18} style={{ marginRight: '10px' }} /> Додати товар
            </NavLink>
            <UserInfo />
          </>
        )}
      </div>

      <div className={s.containerBottom}>
        {isDesktop && (
          <>
            <div className={s.navigationMenuWrapper}>
              <Catalog data={menuItems} />
              {navItems.map(({ id, name, link }) => (
                <NavLink
                  key={id}
                  className={getClassName({
                    isActive: location.pathname === { link },
                  })}
                  to={link}
                >
                  {name}
                </NavLink>
              ))}
            </div>
            <div className={s.switchMainBox}>
              <SwitchBtn type="language" />
              <SwitchBtn type="theme" />
            </div>
          </>
        )}
        {!isDesktop && (
          <div className={s.switchMainBox}>
            <SwitchBtn type="language" />
            <SwitchBtn type="theme" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
