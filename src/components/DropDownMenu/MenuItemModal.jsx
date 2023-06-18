import { ReactComponent as Flech } from '../../images/dropDownMenu/flech.svg';
import s from './ModalCatalog.module.scss';

const MenuItemModal = ({
  menuItem,
  activeItem,
  isSubMenuOpen,
  setIsSubMenuOpen,
}) => {
  return (
    <div
      className={`menu-item ${isSubMenuOpen ? 'active' : ''} ${
        activeItem === menuItem.name ? 'highlight' : ''
      } ${s.menuContainer}`}
      onClick={() =>
        setIsSubMenuOpen({ submenu: menuItem.submenu, itemName: menuItem.name })
      }
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <span className={s.span}>{menuItem.icon}</span>
        <span className={s.span}>{menuItem.name}</span>
      </div>

      <Flech
        className={s.flech}
        style={{
          width: '15px',
          height: '15px',
          marginRight: '15px',
          fill: '#010101',
        }}
      />
    </div>
  );
};

export default MenuItemModal;
