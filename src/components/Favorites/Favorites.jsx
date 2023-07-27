import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserLikesBasket } from 'redux/auth/auth-opetations';
import { getLikedProducts, getID } from 'redux/auth/auth-selectors';

import ProductItem from '../Shared/ProductItem/ProductItem';
import Container from 'components/Shared/Container';
import Text from 'components/Shared/Text/Text';

import s from './Favorites.module.scss';

const Favorites = () => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const likedProducts = useSelector(getLikedProducts);
  const userId = useSelector(getID);

  useEffect(() => {
    dispatch(getUserLikesBasket());

    setIsLiked(false);
  }, [dispatch, isLiked]);

  // for likes
  const checkUserLike = productId => {
    const product = likedProducts.find(item => item._id === productId);

    if (product) {
      return product.userLikes.includes(userId);
    }
    return false;
  };

  const handleLike = isLiked => {
    setIsLiked(isLiked);
  };

  return (
    <Container>
      <section>
        <section className={s.likesSection}>
          <Text textClass="title" text="Обране" />
          {likedProducts && likedProducts.length > 0 ? (
            <ul className={s.listCard}>
              {likedProducts.map(item => (
                <ProductItem
                  key={item._id}
                  _id={item._id}
                  mainPhotoUrl={item.mainPhotoUrl}
                  price={item.price}
                  likes={item.userLikes.length ? item.userLikes.length : 0}
                  userLike={checkUserLike(item._id)}
                  handleLike={handleLike}
                  nameProduct={item.nameProduct}
                  description={item.description}
                  size={item.size}
                  section={item.section}
                  category={item.category}
                />
              ))}
            </ul>
          ) : (
            <Text text="В обраному нічого немає" />
          )}
        </section>
      </section>
    </Container>
  );
};

export default Favorites;
