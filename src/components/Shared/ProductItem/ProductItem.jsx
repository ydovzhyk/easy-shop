import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import SizeHovered from '../../Catalog/SizeHovered/SizeHovered';
import { updateUserLikes } from 'redux/auth/auth-opetations';
import { getUser, getUserLikes } from 'redux/auth/auth-selectors';

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

  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const userLikes = useSelector(getUserLikes);
  const [likesCount, setLikesCount] = useState(() => {
    const likesData = localStorage.getItem('userLikes');
    return likesData ? parseInt(likesData) : 0;
  });

  console.log('userLikes', userLikes);
  // console.log('user', user);
  useEffect(() => {
    if (user && user.userLikes) {
      setLikesCount(user.userLikes.length);
    } else {
      setLikesCount(0);
    }
  }, [user]);

  // Отримання лайків з локального сховища
  useEffect(() => {
    const likesData = localStorage.getItem('userLikes');
    if (likesData) {
      setLikesCount(parseInt(likesData));
    }
  }, []);

  // Зберігання лайків у локальному сховищі при зміні кількості лайків
  useEffect(() => {
    localStorage.setItem('userLikes', likesCount.toString());
  }, [likesCount]);

  const handleClick = () => {
    if (likesCount > 0) {
      dispatch(updateUserLikes({ productId: _id }));
      setLikesCount(likesCount - 1);
    } else {
      dispatch(updateUserLikes({ productId: _id }));
      setLikesCount(likesCount + 1);
    }
  };

  // const handleClick = () => {
  //   dispatch(updateUserLikes({ productId: _id }));
  // };

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
          {/* <p className={s.likeCard}>{likes}</p> */}
          <p className={s.likeCard}>{likes}</p>
          <FiHeart
            size={24}
            className={`${s.liked} ${likesCount > 0 ? s.isLiked : ''}`}
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
