import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserLikesBasket } from 'redux/auth/auth-opetations';
import { getLikedProducts } from 'redux/auth/auth-selectors';

import ProductItem from '../Shared/ProductItem/ProductItem';
import Container from 'components/Shared/Container';
import Text from 'components/Shared/Text/Text';

import s from './Favorites.module.scss';

const Favorites = () => {
  const dispatch = useDispatch();
  const likedProducts = useSelector(getLikedProducts);

  console.log('likedProducts', likedProducts);

  useEffect(() => {
    dispatch(getUserLikesBasket());
  }, [dispatch]);

  return (
    <Container>
      <section>
        <section className={s.likesSection}>
          <Text textClass="title" text="Обране" />
          {likedProducts ? (
            <ul className={s.listCard}>
              {likedProducts.map(item => (
                <ProductItem
                  key={item._id}
                  _id={item._id}
                  mainPhotoUrl={item.mainPhotoUrl}
                  price={item.price}
                  likes={item.userLikes.length ? item.userLikes.length : 0}
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
