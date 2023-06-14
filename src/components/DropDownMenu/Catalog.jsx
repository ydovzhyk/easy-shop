import React, { useState } from 'react';
import MenuItem from './MenuItem';
import menuItems from './menuItems';
import s from './Catalog.module.scss';
import { ReactComponent as Line } from '../../images/dropDownMenu/line.svg';

export const Catalog = () => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeItem, setActiveItem] = useState('');

  return (
    <div className={s.nav} onBlur={() => setActiveMenu(false)}>
      {/* <nav> */}
      <div className={s.catalog}>
        <button
          onClick={() => setActiveMenu(!activeMenu)}
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <Line className={s.line} />
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
      {/* </nav> */}
    </div>
  );
};
