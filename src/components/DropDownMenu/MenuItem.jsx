import s from './Catalog.module.scss';

import React, { useState, useEffect } from 'react';
import { useSearchParams, createSearchParams, Link } from 'react-router-dom';

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
    return query === ''
      ? `${link}`
      : `${link}?${createSearchParams({
          search: query,
        })}`;
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
      <Link to={getPathCategory(menuItem.link)}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={s.span}>{menuItem.icon}</span>
          <span className={s.span}>{menuItem.name}</span>
        </div>
      </Link>

      <Flech className={s.flech} />

      {isSubMenuOpen && (
        <div className={s.containerSubMenu}>
          {menuItem.submenu.map(subMenuItem => (
            <Link to={getPathCategory(subMenuItem.link)} key={subMenuItem.id}>
              <div
                className={`submenu-item ${
                  activeItem === subMenuItem.name ? 'active' : ''
                } ${s.item}`}
              >
                {subMenuItem.name}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MenuItem;
