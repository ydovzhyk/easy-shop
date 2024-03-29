import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateUserLikes } from 'redux/auth/auth-operations';
import { getLogin } from 'redux/auth/auth-selectors.js';

import SizeHovered from '../../Catalog/SizeHovered/SizeHovered';
import ErrorMessage from 'components/Shared/ErrorMessage/ErrorMessage';
import Text from 'components/Shared/Text/Text';

import NoPhoto from '../../../images/catalog_photo/no_photo.jpg';
import { FiHeart } from 'react-icons/fi';
import { translateParamsToEN } from 'funcs&hooks/translateParamsToEN';
import s from './ProductItem.module.scss';

const ProductItem = ({
  _id,
  userId,
  mainPhotoUrl,
  price,
  likes,
  userLike,
  isLiked,
  handleLike,
  nameProduct,
  owner,
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

  // for sale
  const discountedPrice = (price * (100 - sale)) / 100;
  // for likes
  const handleClick = async () => {
    if (!isUserLogin) {
      setIsErrorDisplayed(true);
      setErrorMessage('Спочатку зареєструйтеся!');
      return;
    }

    if (owner === userId) {
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

  // for hovered Size
  const [activeSize, setActiveSize] = useState(null);

  const handleMouseEnter = (index, event) => {
    setActiveSize(index);
  };

  const handleMouseLeave = () => {
    setActiveSize(null);
  };

  // for Descroption
  const MAX_DESCRIPTION_LENGTH = 90;

  const getShortenedDescription = () => {
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      const shortenedDescription = description.substring(
        0,
        MAX_DESCRIPTION_LENGTH
      );

      return (
        <>
          <span>{shortenedDescription} </span>
          <br />
          <span>. . .</span>
        </>
      );
    }
    return description;
  };

  return (
    <li className={s.itemCard}>
      <Link
        to={`/product/${categoryName}/${subCategoryName}/${_id}`}
        className={s.photoLink}
      >
        <img
          className={s.photoCard}
          src={mainPhotoUrl}
          onError={e => (e.target.src = NoPhoto)}
          alt="фото товару"
        />
        <div className={s.overlayLabel}>
          {vip === 'Так' && (
            <div className={s.label}>
              <span>Vip</span>
            </div>
          )}
          {sale > 0 && (
            <div className={s.label}>
              <span>{sale}%</span>
            </div>
          )}
        </div>
        <div className={s.styleDescriptionProductCardBox}></div>
        <div className={s.styleDescriptionProductCard}>
          <p className={s.descriptionProductCard}>
            {getShortenedDescription()}
          </p>
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
          </div>
        </Link>
      </div>
      <div
        className={s.styleSizeCard}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {size.map((item, index) => {
          return item[0]?.name === 'One size' || item[0]?.name === 'Інший' ? (
            <div className={s.sizeItem} key={index}>
              {index > 0 && <span className={s.separator}> / </span>}
              <Text text={item[0]?.name} textClass="after-title-bigger" />
            </div>
          ) : (
            <div
              className={s.sizeItem}
              key={index}
              onMouseEnter={event => handleMouseEnter(index, event)}
              onMouseLeave={handleMouseLeave}
            >
              {index > 0 && <span className={s.separator}> / </span>}
              <span className={s.sizeName}>{item[0]?.name}</span>
              {activeSize === index && (
                <div className={s.hoveredSize}>
                  <SizeHovered activeSize={activeSize} sizes={size} />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {isErrorDisplayed && (
        <ErrorMessage text={errorMessage} onDismiss={resetError} />
      )}
    </li>
  );
};

export default ProductItem;
