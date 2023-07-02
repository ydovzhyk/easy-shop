import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import SizeHovered from '../../Catalog/SizeHovered/SizeHovered';
import { updateUserLikes } from 'redux/auth/auth-opetations';
import { selectUserLikes } from 'redux/auth/auth-selectors';

import NoPhoto from '../../../images/catalog_photo/no_photo.jpg';
import Text from 'components/Shared/Text/Text';
import { FiHeart } from 'react-icons/fi';
import { translateParamsToEN } from 'funcs&hooks/translateParamsToEN';
import s from './ProductItem.module.scss';

const ProductItem = ({
  _id,
  mainPhotoUrl,
  price,
  likes,
  nameProduct,
  description,
  size,
  section,
  category,
}) => {
  const translatedParamsObj = translateParamsToEN(section, category);
  const [categoryName, subCategoryName] = Object.values(translatedParamsObj);

  const arrayLikes = [
    {
      _id: '648ae4cdfeafabed7c1883e7',
    },
    {
      _id: '648ae4cdfeafabed7c1883e5',
    },
    {
      _id: '648ae4cdfeafabed7c1883e6',
    },
    {
      _id: '648ae4cdfeafabed7c1883e8',
    },
  ];
  console.log('arrayLikes.length', arrayLikes.length);

  const dispatch = useDispatch();
  // const myLikes = useSelector(selectUserLikes);
  // const [isLiked, setIsLiked] = useState(false);

  // console.log('myLikes', myLikes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    setIsLiked(arrayLikes.some(item => item._id === _id));
  }, [arrayLikes, _id]);

  const handleClick = () => {
    // if (isLiked) {
    //   dispatch(removeUserLikes({ productId: _id }));
    // } else {
    //   dispatch(updateUserLikes({ productId: _id }));
    // }
    dispatch(updateUserLikes({ productId: _id }));
  };
  
  // useEffect(() => {
  //   setIsLiked(arrayUserLikes.includes(_id));
  // }, [arrayUserLikes, _id]);

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
        <div className={s.styleLike} onClick={handleClick}>
          <p className={s.likeCard}>{arrayLikes.length}</p>
          <p className={s.likeCard}>{likes}</p>
          <FiHeart
            size={24}
            className={`${s.liked} ${isLiked ? s.isLiked : ''}`}
          />
          {/* <NavLink to="/favorites" className={s.link}>
            <FiHeart size={24} />
          </NavLink> */}
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
      {/* <div className={s.styleSizeCard}>
        <SizeHovered size={size} />
      </div> */}
    </li>
  );
};

export default ProductItem;
