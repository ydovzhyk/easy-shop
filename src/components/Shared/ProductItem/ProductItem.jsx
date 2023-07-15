import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateUserLikes } from 'redux/auth/auth-opetations';
import { getLogin } from 'redux/auth/auth-selectors.js';

import NoPhoto from '../../../images/catalog_photo/no_photo.jpg';
import ErrorMessage from 'components/Shared/ErrorMessage/ErrorMessage';
// import SizesWithoutSelect from 'components/Shared/Sizes/SizesWithoutSelect/SizesWithoutSelect';
import SizeHovered from '../../Catalog/SizeHovered/SizeHovered';
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
  // console.log('vip', vip);

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

  // for hovered Size
  // const [isHovered, setIsHovered] = useState(false);

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  // };

  // for hovered Size
  const [activeSize, setActiveSize] = useState(null);
  const [triangleLeft, setTriangleLeft] = useState(null);
  console.log('activeSize', activeSize);

  const handleMouseEnter = (index, event) => {
    // const sizeValue = size[index][0] && size[index][0].name;
    // if (size === 'one size' || size === 'інший' || !size) {
    //   return;
    // }
    // console.log('size', size);
    setActiveSize(index);
    if (event && event.target) {
      setTriangleLeft(event.target.offsetLeft + event.target.offsetWidth / 2);
    }
  };

  const handleMouseLeave = () => {
    setActiveSize(null);
    setTriangleLeft(null);
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
          {vip === 'Так' && sale && (
            <div className={s.saleLabel}>
              <span>{sale}%</span>
            </div>
          )}
          {vip !== 'Так' && sale && (
            <div className={`${s.saleLabel} ${s.saleLabelNoVip}`}>
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
      <div
        className={s.styleSizeCard}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {size.map((item, index) =>
          size[0]?.name === 'one size' || size[0]?.name === 'інший' ? (
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
                <div className={s.hoveredSize} style={{ left: triangleLeft }}>
                  <SizeHovered activeSize={activeSize} sizes={size} />
                </div>
              )}
            </div>
          )
        )}
      </div>
      {isErrorDisplayed && (
        <ErrorMessage text={errorMessage} onDismiss={resetError} />
      )}
    </li>
  );
};

export default ProductItem;
