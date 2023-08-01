// import { Link } from 'react-router-dom';
import s from './Catalog.module.scss';

import React, { useState, useEffect } from 'react';
import {
  useSearchParams,
  createSearchParams,
  // useLocation,
} from 'react-router-dom';

import { ReactComponent as Flech } from '../../images/dropDownMenu/flech.svg';

const MenuItem = ({ menuItem, activeItem, setActiveItem }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [query, setQuery] = useState('');
  const [searchParams] = useSearchParams();
  // const { pathname } = useLocation();
  // const isUserAtProductsSearchPage = pathname.includes('/products');
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
    if (process.env.NODE_ENV === 'production') {
      setUrl('easy-shop');
    }
    if (process.env.NODE_ENV === 'development') {
      return;
    }
  }, []);

  // const getPathCategory = link => {
  //   if (!isUserAtProductsSearchPage && query === '') {
  //     console.log(`${link}`);
  //     return `${link}`;
  //   }
  //   if (!isUserAtProductsSearchPage && query !== '') {
  //     return `${link}?${createSearchParams({
  //       search: query,
  //     })}`;
  //   }
  //   if (isUserAtProductsSearchPage && query === '') {
  //     console.log(`${link.split('/').slice(1).join('')}`);
  //     return `${'/'} ${link.split('/').slice(1).join('')}`;
  //   }
  //   if (isUserAtProductsSearchPage && query !== '') {
  //     return `${link.split('/').slice(2)}?${createSearchParams({
  //       search: query,
  //     })}`;
  //   }
  // };

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
          // 'men'
          // getPathCategory(menuItem.link)
          query === ''
            ? `${url}${menuItem.link}`
            : `${url}${menuItem.link}?${createSearchParams({
                search: query,
              })}`
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
                // getPathCategory(subMenuItem.link)
                query === ''
                  ? `${url}${subMenuItem.link}`
                  : `${url}${subMenuItem.link}?${createSearchParams({
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
