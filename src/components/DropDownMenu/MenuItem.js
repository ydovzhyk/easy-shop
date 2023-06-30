// import { Link } from 'react-router-dom';
import s from './Catalog.module.scss';

import React, { useState, useEffect } from 'react';
import { useSearchParams, createSearchParams } from 'react-router-dom';

import { ReactComponent as Flech } from '../../images/dropDownMenu/flech.svg';

const MenuItem = ({ menuItem, activeItem, setActiveItem }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  const handleMouseEnter = () => {
    setActiveItem(menuItem.name);
    setIsSubMenuOpen(true);
  };
  const handleMouseLeave = () => {
    setActiveItem('');
    setIsSubMenuOpen(false);
  };

  useEffect(() => {
    setQuery(searchQuery);
  }, [searchQuery]);

  return (
    <div
      className={`menu-item ${isSubMenuOpen ? 'active' : ''} ${
        activeItem === menuItem.name ? 'highlight' : ''
      } ${s.menuContainer}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href={
          query === ''
            ? `${menuItem.link}`
            : `${menuItem.link}?${createSearchParams({
                search: query,
              })}`
        }
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={s.span}>{menuItem.icon}</span>
          <span className={s.span}>{menuItem.name}</span>
        </div>
      </a>
      <Flech
        className={s.flech}
      />

      {isSubMenuOpen && (
        <div className={s.containerSubMenu}>
          {menuItem.submenu.map(subMenuItem => (
            <a
              href={
                query === ''
                  ? `${subMenuItem.link}`
                  : `${subMenuItem.link}?${createSearchParams({
                      search: query,
                    })}`
              }
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
