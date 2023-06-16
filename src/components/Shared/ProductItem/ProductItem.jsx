import { Link, NavLink } from 'react-router-dom';
import NoPhoto from '../../../images/catalog_photo/no_photo.jpg';
import { FiHeart } from 'react-icons/fi';
import s from './ProductItem.module.scss';

const ProductItem = ({
  _id,
  mainPhotoUrl,
  section,
  category,
  description,
  price,
  nameProduct,
}) => {
  return (
    <li className={s.itemCard} key={_id}>
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
      <p className={s.sizeCard}>36</p>
    </li>
  );
};

export default ProductItem;
