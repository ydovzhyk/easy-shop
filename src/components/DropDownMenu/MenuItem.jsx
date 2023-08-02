import s from './Catalog.module.scss';

import React, { useState, useEffect } from 'react';
import { useSearchParams, createSearchParams } from 'react-router-dom';

import { ReactComponent as Flech } from '../../images/dropDownMenu/flech.svg';

const MenuItem = ({ menuItem, activeItem, setActiveItem }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchParams] = useSearchParams();

  // const isUserAtProductsSearchPage =
  //   pathname.includes('/products') && pathname.split('/').length <= 4;
  const searchQuery = searchParams.get('search') ?? '';

  const handleMouseEnter = () => {
    setActiveItem(menuItem.name);
    setIsSubMenuOpen(true);
  };
  const handleMouseLeave = () => {
    setActiveItem('');
    setIsSubMenuOpen(false);
  };

  const getPathCategory = link => {
    if (process.env.NODE_ENV === 'production') {
      return query === ''
        ? `${'#'}${link}`
        : `${'#'}${link}?${createSearchParams({
            search: query,
          })}`;
    }
    if (process.env.NODE_ENV === 'development') {
      return query === ''
        ? `${link}`
        : `${link}?${createSearchParams({
            search: query,
          })}`;
    }
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
          getPathCategory(menuItem.link)
          // query === ''
          //   ? `${menuItem.link}`
          //   : `${menuItem.link}?${createSearchParams({
          //       search: query,
          //     })}`
        }
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={s.span}>{menuItem.icon}</span>
          <span className={s.span}>{menuItem.name}</span>
        </div>
      </a>
      <Flech className={s.flech} />

      {isSubMenuOpen && (
        <div className={s.containerSubMenu}>
          {menuItem.submenu.map(subMenuItem => (
            <a
              href={
                getPathCategory(subMenuItem.link)
                // query === ''
                //   ? `${subMenuItem.link}`
                //   : `${subMenuItem.link}?${createSearchParams({
                //       search: query,
                //     })}`
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
