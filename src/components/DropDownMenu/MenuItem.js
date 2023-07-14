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

  // const getPathCategory = link => {
  //   if (!isUserAtProductsSearchPage && query === '') {
  //     return `${link}`;
  //   }
  //   if (!isUserAtProductsSearchPage && query !== '') {
  //     return `${link}?${createSearchParams({
  //       search: query,
  //     })}`;
  //   }
  //   if (isUserAtProductsSearchPage && query === '') {
  //     return `${link.split('/').slice(2)}`;
  //   }
  //   if (isUserAtProductsSearchPage && query !== '') {
  //     return `${link.split('/').slice(2)}?${createSearchParams({
  //       search: query,
  //     })}`;
  //   }
  // };

  // const getPathCategory = link => {
  //   if (!isUserAtProductsSearchPage && query === '') {
  //     console.log('1');
  //     console.log(`${link}`);
  //     return `${link}`;
  //   }
  //   if (!isUserAtProductsSearchPage && query !== '') {
  //     console.log('2');
  //     console.log(
  //       `${link}?${createSearchParams({
  //         search: query,
  //       })}`
  //     );
  //     return `${link}?${createSearchParams({
  //       search: query,
  //     })}`;
  //   }
  //   if (isUserAtProductsSearchPage && query === '') {
  //     console.log('3');
  //     console.log(`${link.split('/').slice(2).join('')}`);
  //     console.log(`${link}`);
  //     console.log(link);
  //     // return `${link.split('/').slice(2).join('')}`;
  //     return `${link}`;
  //   }
  //   if (isUserAtProductsSearchPage && query !== '') {
  //     console.log('4');
  //     console.log(
  //       `${link.split('/').slice(2).join('/')}?${createSearchParams({
  //         search: query,
  //       })}`
  //     );
  //     return `${link.split('/').slice(2).join('/')}?${createSearchParams({
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
          // getPathCategory(menuItem.link)
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
      <Flech className={s.flech} />

      {isSubMenuOpen && (
        <div className={s.containerSubMenu}>
          {menuItem.submenu.map(subMenuItem => (
            <a
              href={
                // getPathCategory(subMenuItem.link)
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
