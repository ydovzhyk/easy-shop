import React, { useState, useRef } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';

import VipProducts from '../Catalog/VipProducts/VipProducts';
// import SelectorProducts from '../Catalog/SelectorProducts/SelectorProducts';

import Text from 'components/Shared/Text/Text';
import s from './Catalog.module.scss';

const Catalog = () => {
  const location = useLocation().pathname;
  
  const activeNewRef = useRef();
  const [activeButton, setActiveButton] = useState('new');

  const handleButtonClick = buttonName => {
    setActiveButton(buttonName);
  };

  return (
    <section className={s.container}>
      <Text text={'VIP-Оголошення'} textClass="catalogTitle" />

      <VipProducts />

      <ul className={s.listLikes}>
        <li className={s.itemLikes}>
          <div className={s.wrapper}>
            <NavLink
              to="new"
              // className={isLikedProducts ? s.activeLink : s.linkStyle}
            >
              НОВИНКИ
            </NavLink>
          </div>
        </li>
        <li className={s.itemLikes}>
          <div className={s.wrapper}>
            <NavLink
              to="sale"
              // className={isLikedProducts ? s.activeLink : s.linkStyle}
            >
              ЗНИЖКИ
            </NavLink>
          </div>
        </li>
        <li className={s.itemLikes}>
          <div className={s.wrapper}>
            <NavLink
              to="advice"
              // className={isLikedProducts ? s.activeLink : s.linkStyle}
            >
              ПОПУЛЯРНІ
            </NavLink>
          </div>
        </li>
      </ul>

      <div className={s.styleWrapButton} ref={activeNewRef}>
        <button
          className={
            activeButton === 'new' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('new')}
        >
          Новинки
        </button>
        <button
          className={
            activeButton === 'sale' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('sale')}
        >
          Знижки
        </button>
        <button
          className={
            activeButton === 'advice' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('advice')}
        >
          Популярні
        </button>
      </div>
      {/* <div className={s.styleWrapButton} ref={activeNewRef}>
        <button
          className={
            activeButton === 'new' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('new')}
        >
          Новинки
        </button>
        <button
          className={
            activeButton === 'sale' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('sale')}
        >
          Знижки
        </button>
        <button
          className={
            activeButton === 'advice' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('advice')}
        >
          Популярні
        </button>
      </div> */}

      <Outlet />
    </section>
  );
};

export default Catalog;
