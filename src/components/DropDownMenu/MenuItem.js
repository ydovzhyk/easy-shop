// import { Link } from 'react-router-dom';
import s from './Catalog.module.scss';

import React, { useState } from 'react';

import { ReactComponent as Flech } from '../../images/dropDownMenu/flech.svg';

const MenuItem = ({ menuItem, activeItem, setActiveItem }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const handleMouseEnter = () => {
    setActiveItem(menuItem.name);
    setIsSubMenuOpen(true);
  };
  const handleMouseLeave = () => {
    setActiveItem('');
    setIsSubMenuOpen(false);
  };

  return (
    <div
      className={`menu-item ${isSubMenuOpen ? 'active' : ''} ${
        activeItem === menuItem.name ? 'highlight' : ''
      } ${s.menuContainer}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    > 
      <a href={`/products?search=${menuItem.name.split('`')[0]}`}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={s.span}>{menuItem.icon}</span>
          <span className={s.span}>{menuItem.name}</span>
        </div>
      </a>
      <Flech
        className={s.flech}
        style={{
          width: '15px',
          height: '15px',
          marginRight: '15px',
          fill: '#010101',
        }}
      />

      {isSubMenuOpen && (
        <div className={s.containerSubMenu}>
          {menuItem.submenu.map(subMenuItem => (
            <a
              href={`/products?search=${subMenuItem.name}`}
              key={subMenuItem.id}
            >
              <div
                className={`submenu-item ${
                  activeItem === subMenuItem.name ? 'active' : ''
                } ${s.item}`}
              >
                {subMenuItem.name}
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
