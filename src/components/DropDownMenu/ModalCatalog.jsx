import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import s from './Catalog.module.scss';
import menuItems from './menuItems';
import MenuItem from './MenuItem';

const modalRoot = document.querySelector('#modal-root');
export const ModalCatalog = ({ closeModal }) => {
//   const [activeMenu, setActiveMenu] = useState(false);
  const [activeItem, setActiveItem] = useState('');
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
      </div>
    </div>,
    modalRoot
  );
};
