import { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { NavLink, useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BiSearchAlt } from 'react-icons/bi';
import { HiOutlineBars4 } from 'react-icons/hi2';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { VscAdd } from 'react-icons/vsc';

import { getLogin } from 'redux/auth/auth-selectors';

import UserInfo from 'components/UserInfo/UserInfo';
import HeaderForm from 'components/HeaderForm/HeaderForm';
import SwitchBtn from 'components/Shared/SwitchBtn/SwitchBtn';
import Logo from 'components/Shared/Logo';
import Button from 'components/Shared/Button';
import { Catalog } from 'components/DropDownMenu/Catalog';
import menuItems from 'components/DropDownMenu/menuItems';
import { ModalCatalog } from 'components/DropDownMenu/ModalCatalog';
import categoryOptions from '../AddProduct/category.json';
import { getPath } from '../../funcs&hooks/getPath.js';

import s from './Header.module.scss';

const Header = () => {
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [isModalCatalogOpen, setIsModalCatalogOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  const isTablet = useMediaQuery({ minWidth: 768 });
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const categories = Object.keys(categoryOptions);

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  // const getClassName = ({ isActive }) => {
  //   console.log(isActive);
  //   return isActive ? `${s.active}` : s.link;
  // };


useEffect(() => {
    if (darkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkTheme]);
  const handleThemeChange = () => {
    setDarkTheme(!darkTheme);
  };
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
    <header className={`${s.header} ${darkTheme ? s.darkTheme : ''}`}>
      <div className="container">
        <div className={s.containerTop}>
          {!isDesktop && !isTablet && (
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
          {!isDesktop && isTablet && (
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
              <div style={{ marginLeft: '20px', width: '100%' }}>
                <HeaderForm />
              </div>
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
                <VscAdd size={18} style={{ marginRight: '10px' }} /> Додати
                товар
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
                {categories.map((category, index) => (
                  <NavLink
                    key={index}
                    className={({ isActive }) =>
                      `${isActive ? s.active : s.link}`
                    }
                    // className={getClassName({
                    //   isActive: location.pathname === linkPath,
                    // })}

                    to={getPath(query, category)}
                    // onClick={e => setSearchParams({ search: query })}
                  >
                    {category}
                  </NavLink>
                ))}
              </div>
              <div className={s.switchMainBox}>
                <SwitchBtn type="language" />
                <SwitchBtn type="theme" />
              </div>
            </>
          )}
          {!isDesktop && !isMobile && (
            <>
              <div className={s.navigationMenuWrapper}>
                {categories.map((category, index) => (
                  <NavLink
                    key={index}
                    className={({ isActive }) =>
                      `${isActive ? s.active : s.link}`
                    }
                    to={getPath(query, category)}
                  >
                    {category}
                  </NavLink>
                ))}
              </div>
              <div className={s.switchMainBox}>
                <SwitchBtn type="language" />
                <SwitchBtn type="theme" />
              </div>
            </>
          )}
          {!isDesktop && isMobile && (
            <div className={s.switchMainBox}>
              <SwitchBtn type="language" />
              <SwitchBtn type="theme" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
