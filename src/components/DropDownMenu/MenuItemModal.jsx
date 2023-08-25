import { ReactComponent as Flech } from '../../images/dropDownMenu/flech.svg';
import React, { useState, useEffect } from 'react';
import { useSearchParams, createSearchParams, Link } from 'react-router-dom';

import s from './ModalCatalog.module.scss';

const MenuItemModal = ({
  menuItem,
  activeItem,
  isSubMenuOpen,
  setIsSubMenuOpen,
}) => {
  const [query, setQuery] = useState('');
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get('search') ?? '';

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
      onClick={() =>
        setIsSubMenuOpen({ submenu: menuItem.submenu, itemName: menuItem.name })
      }
    >
      <Link to={getPathCategory(menuItem.link)}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span className={s.span}>{menuItem.icon}</span>
          <span className={s.span}>{menuItem.name}</span>
        </div>
      </Link>

      <Flech
        className={s.flech}
        style={{
          width: '15px',
          height: '15px',
          marginRight: '15px',
        }}
      />
    </div>
  );
};

export default MenuItemModal;
