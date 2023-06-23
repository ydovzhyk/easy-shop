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
  return (
    <li className={s.itemCard}>
      <Link
        to={`/products/${section}/${category}/${_id}`}
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

      <Link to={`/products/${section}/${category}/${_id}`}>
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
