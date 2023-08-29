import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineBars4, HiArrowLongLeft } from 'react-icons/hi2';

import { useMediaQuery } from 'react-responsive';

import { createPortal } from 'react-dom';

import menuItems from './menuItems';
import Button from 'components/Shared/Button/Button';
import MenuItemModal from './MenuItemModal';

import s from './ModalCatalog.module.scss';

const modalRoot = document.querySelector('#modal-root');
export const ModalCatalog = ({ closeModal }) => {
  //   const [activeMenu, setActiveMenu] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [subMenu, setSubMenu] = useState({ submenu: [], itemName: '' });
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      closeModal(false);
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      closeModal(false);
    }
  };
  return createPortal(
    <div onClick={handleBackdropClick} className={s.ModalBackdrop}>
      <div className={s.ModalCatalog}>
        <header>
          <div className={s.modalTopContainer}>
            {!subMenu.submenu.length && (
              <>
                <Button
                  type="button"
                  btnClass="burgerButton"
                  handleClick={() => {
                    closeModal(false);
                  }}
                  text={<HiOutlineBars4 size={isMobile ? 22 : 30} />}
                />
                <p className={s.logo}>EasyShop</p>
              </>
            )}
            {subMenu.submenu.length ? (
              <>
                <Button
                  type="button"
                  btnClass="burgerButton"
                  handleClick={() => {
                    setSubMenu({ submenu: [], itemName: '' });
                  }}
                  text={<HiArrowLongLeft size={30} />}
                />
                <p className={s.logo}>{subMenu.itemName}</p>
              </>
            ) : (
              ''
            )}
          </div>
        </header>
        <div className={s.dropdownMenu}>
          {!subMenu.submenu.length &&
            menuItems.map(menuItem => (
              <MenuItemModal
                key={menuItem.id}
                menuItem={menuItem}
                activeItem={activeItem}
                setActiveItem={setActiveItem}
                isSubMenuOpen={subMenu}
                setIsSubMenuOpen={setSubMenu}
              />
            ))}
          {subMenu.submenu.length ? (
            <div className={s.containerSubMenu}>
              {subMenu.submenu.map(subMenuItem => (
                <Link to={subMenuItem.link} key={subMenuItem.id}>
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
          ) : (
            ''
          )}
        </div>
      </div>
    </div>,
    modalRoot
  );
};
