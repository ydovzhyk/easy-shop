import React, { useState } from 'react';

import MenuItem from './MenuItem';
import menuItems from './menuItems';
import s from './Catalog.module.scss';
import { ReactComponent as SVG } from '../../images/dropDownMenu/line.svg';
// const isDesktop = useMediaQuery({ minWidth: 1280 });
//   const isMobile = useMediaQuery({ maxWidth: 767 });
export const Catalog = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  const getClassName = ({ isActive }) => {
    return isActive ? `${s.catalog} ${s.active} ` : s.catalog;
  };

  return (
    <div
      className={s.nav}
      onBlur={e => {
        if (!e.relatedTarget) setActiveMenu(false);
      }}
    >
      <div
        className={getClassName({
          isActive: activeMenu,
        })}
      >
        <button
          onClick={() => {
            setActiveMenu(!activeMenu);
          }}
          className={s.button}
        >
          <SVG className={s.svg} />
          Каталог
        </button>
      </div>

      {activeMenu && (
        <div className={s.dropdownMenu}>
          {menuItems.map(menuItem => (
            <MenuItem
              key={menuItem.id}
              menuItem={menuItem}
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          ))}
        </div>
      )}
    </div>
  );
};
