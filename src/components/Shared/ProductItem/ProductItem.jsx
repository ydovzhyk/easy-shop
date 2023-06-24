import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import NoPhoto from '../../../images/catalog_photo/no_photo.jpg';
import Text from 'components/Shared/Text/Text';
import { FiHeart } from 'react-icons/fi';
import s from './ProductItem.module.scss';

const ProductItem = ({
  _id,
  mainPhotoUrl,
  price,
  nameProduct,
  description,
  size,
  section,
  category,
}) => {
  let categoryName = '';
  let subCategoryName = '';

  switch (section) {
    case 'Жінкам':
      categoryName = 'women';
      break;
    case 'Чоловікам':
      categoryName = 'men';
      break;
    case 'Дитячі товари':
      categoryName = 'children';
      break;
    case "Краса та здоров'я":
      categoryName = 'beauty&health';
      break;
    default:
      break;
  }

  if (section === 'Чоловікам') {
    switch (category) {
      case 'Верхній одяг':
        subCategoryName = 'outerwear';
        break;
      case 'Піджаки і костюми':
        subCategoryName = 'jackets & suits';
        break;
      case 'Кофти та светри':
        subCategoryName = 'coats & tops';
        break;
      case 'Сорочки та теніски':
        subCategoryName = 'shirts & t-shirts';
        break;
      case 'Футболки та майки':
        subCategoryName = 't-shirts & tank tops';
        break;
      case 'Нижня білизна':
        subCategoryName = 'underwear';
        break;
      case 'Взуття':
        subCategoryName = 'shoes';
        break;
      case 'Аксесуари':
        subCategoryName = 'accessories';
        break;
      case 'Спортивний одяг':
        subCategoryName = 'sportswear';
        break;
      case 'Одяг для дому та сну':
        subCategoryName = 'clothing for home and sleep';
        break;
      case 'Спецодяг':
        subCategoryName = 'special clothing';
        break;
      case 'Тактичний одяг':
        subCategoryName = 'tactical clothing';
        break;
      case 'Штани та шорти':
        subCategoryName = 'pants and shorts';
        break;
      default:
        break;
    }
  }
  if (section === 'Жінкам') {
    switch (category) {
      case 'Верхній одяг':
        subCategoryName = 'outerwear';
        break;
      case 'Плаття':
        subCategoryName = 'dresses';
        break;
      case 'Спідниці':
        subCategoryName = 'skirts';
        break;
      case 'Майки і футболки':
        subCategoryName = 't-shirts and t-shirts';
        break;
      case 'Сорочки та блузи':
        subCategoryName = 'shirts and blouses';
        break;
      case 'Coats':
        subCategoryName = 'Светри';
        break;
      case 'Нижня білизна':
        subCategoryName = 'underwear';
        break;
      case 'Аксесуари':
        subCategoryName = 'accessories';
        break;
      case 'Інші речі':
        subCategoryName = 'other things';
        break;
      case 'Спортивний одяг':
        subCategoryName = 'sportswear';
        break;
      case 'Костюми':
        subCategoryName = 'suits';
        break;
      case 'Комбінезони':
        subCategoryName = 'overalls';
        break;
      case 'Одяг для дому та сну':
        subCategoryName = 'clothes for home and sleep';
        break;
      case 'Спецодяг':
        subCategoryName = 'special clothes';
        break;
      case 'Для вагітних':
        subCategoryName = 'for pregnant women';
        break;
      case 'Взуття':
        subCategoryName = 'shoes';
        break;
      case 'Штани та шорти':
        subCategoryName = 'pants and shorts';
        break;
      default:
        break;
    }
  }

  if (section === 'Дитячі товари') {
    switch (category) {
      case 'Дитяча кімната':
        subCategoryName = "children's room";
        break;
      case 'Товари для мам':
        subCategoryName = 'products for mothers';
        break;
      case 'Харчування і годування':
        subCategoryName = 'food and feeding';
        break;
      case 'Щоденний догляд':
        subCategoryName = 'daily care';
        break;
      case 'Коляски та автокрісла':
        subCategoryName = 'strollers and car seats';
        break;
      case 'Дитячі іграшки':
        subCategoryName = "children's toys";
        break;
      case 'Дитячий транспорт':
        subCategoryName = "children's transport";
        break;
      case 'Товари для творчості':
        subCategoryName = 'products for creativity';
        break;
      case 'Активний відпочинок':
        subCategoryName = 'active recreation';
        break;
      default:
        break;
    }
  }

  if (section === "Краса та здоров'я") {
    switch (category) {
      case 'Чоловіча косметика':
        subCategoryName = "men's cosmetics";
        break;
      case 'Аксесуари для краси':
        subCategoryName = 'beauty accessories';
        break;
      case 'Декоративна косметика':
        subCategoryName = 'decorative cosmetics';
        break;
      case 'Парфуми':
        subCategoryName = 'perfume';
        break;
      case 'Манікюр і педикюр':
        subCategoryName = 'manicure and pedicure';
        break;
      case 'Косметика для волосся':
        subCategoryName = 'hair cosmetics';
        break;
      case 'Косметика для обличчя':
        subCategoryName = 'face cosmetics';
        break;
      case 'Тіло і ванна':
        subCategoryName = 'body and bath';
        break;
      case 'Догляд за собою':
        subCategoryName = 'self-care';
        break;
      case 'Техніка для краси':
        subCategoryName = 'techniques for beauty';
        break;
      case 'Подарункові набори':
        subCategoryName = 'gift sets';
        break;
      case 'Дезінфікуючи засоби':
        subCategoryName = 'disinfectants';
        break;
      case 'Медичні прилади':
        subCategoryName = 'medical devices';
        break;
      case 'Домашня аптека':
        subCategoryName = 'home pharmacy';
        break;
      case 'Оптика':
        subCategoryName = 'optics';
        break;
      default:
        break;
    }
  }

  return (
    <li className={s.itemCard}>
      <Link
        to={`/products/${categoryName}/${subCategoryName}/${_id}`}
        className={s.photoLink}
      >
        <div className={s.stylePhotoCardWrap}>
          <img
            className={s.photoCard}
            src={mainPhotoUrl}
            onError={e => (e.target.src = NoPhoto)}
            alt=""
          />
          <p className={s.descriptionProductCard}>{description}</p>
        </div>
      </Link>

      <div className={s.stylePriceLike}>
        <p className={s.priceCard}>{price}грн</p>
        <div className={s.styleLike}>
          <p className={s.likeCard}>7</p>
          <NavLink to="/favorites" className={s.link}>
            <FiHeart size={24} />
          </NavLink>
        </div>
      </div>

      <Link to={`/products/${categoryName}/${subCategoryName}/${_id}`}>
        <p className={s.nameProductCard}>{nameProduct}</p>
      </Link>
      <div className={s.styleSizeCard}>
        {size.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className={s.separator}> / </span>}
            <Text text={item[0].name} textClass="after-title-bigger" />
          </React.Fragment>
        ))}
      </div>
    </li>
  );
};

export default ProductItem;
