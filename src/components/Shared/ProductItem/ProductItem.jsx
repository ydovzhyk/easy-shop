import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import SizeHovered from '../../Catalog/SizeHovered/SizeHovered';

import { updateUserLikes } from 'redux/auth/auth-opetations';
import { getLogin } from 'redux/auth/auth-selectors.js';

import NoPhoto from '../../../images/catalog_photo/no_photo.jpg';
import ErrorMessage from 'components/Shared/ErrorMessage/ErrorMessage';
import Text from 'components/Shared/Text/Text';
import { FiHeart } from 'react-icons/fi';
import { translateParamsToEN } from 'funcs&hooks/translateParamsToEN';
import s from './ProductItem.module.scss';

const ProductItem = ({
  _id,
  mainPhotoUrl,
  price,
  likes,
  userLike,
  isLiked,
  handleLike,
  nameProduct,
  description,
  size,
  section,
  category,
  vip,
  sale,
}) => {
  const translatedParamsObj = translateParamsToEN(section, category);
  const [categoryName, subCategoryName] = Object.values(translatedParamsObj);

  const dispatch = useDispatch();
  const isUserLogin = useSelector(getLogin);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isErrorDisplayed, setIsErrorDisplayed] = useState(false);
  console.log('vip', vip);

  // for sale
  const discountedPrice = (price * (100 - sale)) / 100;

  // for likes
  const handleClick = async () => {
    if (!isUserLogin) {
      setIsErrorDisplayed(true);
      setErrorMessage('Спочатку зареєструйтеся!');
      return;
    }

    await dispatch(updateUserLikes({ productId: _id }));

    const newIsLiked = !isLiked;
    handleLike(newIsLiked);
  };

  // for errorMessage
  const resetError = () => {
    setIsErrorDisplayed(false);
    setErrorMessage(null);
  };

  return (
    <li className={s.itemCard}>
      <Link
        to={`/products/${categoryName}/${subCategoryName}/${_id}`}
        className={s.photoLink}
      >
        <div className={s.stylePhotoCardWrap}>
          {vip === 'Так' && (
            <div className={s.vipLabel}>
              <span>Vip</span>
            </div>
          )}
          {sale && (
            <div className={s.saleLabel}>
              <span>{sale}%</span>
            </div>
          )}
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
        <div className={s.stylePrice}>
          {sale ? (
            <>
              <p className={s.oldPriceCard}>{price}грн</p>
              <p className={s.newPriceCard}>{discountedPrice}грн</p>
            </>
          ) : (
            <p className={s.priceCard}>{price}грн</p>
          )}
        </div>
        <div className={s.styleLike} onClick={handleClick}>
          <p className={s.likeCard}>{likes}</p>
          <FiHeart size={24} className={`${userLike ? s.active : s.liked}`} />
        </div>
      </div>

      <div className={s.linkWrapper}>
        <Link to={`/products/${categoryName}/${subCategoryName}/${_id}`}>
          <div style={{ justifyContent: 'flex-start' }}>
            <Text text={nameProduct} textClass="nameProductCard" />
            {/* <p className={s.nameProductCard}>{nameProduct}</p> */}
          </div>
        </Link>
      </div>
      <div className={s.styleSizeCard}>
        {size.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className={s.separator}> / </span>}
            <Text text={item[0].name} textClass="after-title-bigger" />
          </React.Fragment>
        ))}
      </div>
      {/* <div className={s.styleSizeCard}>
        <SizeHovered size={size} />
      </div> */}
      {isErrorDisplayed && (
        <ErrorMessage text={errorMessage} onDismiss={resetError} />
      )}
    </li>
  );
};

export default ProductItem;
