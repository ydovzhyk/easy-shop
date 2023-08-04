import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserLikesBasket } from 'redux/auth/auth-opetations';
import { getLikedProducts, getID } from 'redux/auth/auth-selectors';
import { updateUserSubscriptions } from 'redux/otherUser/otherUser-operations';
import {
  selectUserSubscriptions,
  selectTotalPagesUserSubscription,
} from 'redux/otherUser/otherUser-selectors';

import ProductItem from '../Shared/ProductItem/ProductItem';
import Container from 'components/Shared/Container';

import Button from 'components/Shared/Button';
import Text from 'components/Shared/Text/Text';

import s from './Favorites.module.scss';

const Favorites = () => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const [isUserSubscriptions, setIsUserSubscriptions] = useState(false);
  const [statusFavorites, setStatusFavorites] = useState(true);

  const likedProducts = useSelector(getLikedProducts);
  const userId = useSelector(getID);
  const userSubscriptions = useSelector(selectUserSubscriptions);
  console.log('userSubscriptions', userSubscriptions);
  const totalPages = useSelector(selectTotalPagesUserSubscription);
  console.log('totalPages', totalPages);

  // for favorites product
  const onActive = async data => {
    if (data) {
      setStatusFavorites(true);
    } else {
      setStatusFavorites(false);
    }
  };

  useEffect(() => {
    dispatch(getUserLikesBasket({ statusFavorites }));
    dispatch(updateUserSubscriptions());

    setIsLiked(false);
    setIsUserSubscriptions(false);
  }, [dispatch, statusFavorites, isLiked, isUserSubscriptions]);

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
      <section className={s.likesSection}>
        <div className={s.btnSelect}>
          <div className={s.wrapper}>
            <Button
              text="Обрані товари"
              type="button"
              handleClick={() => onActive(true)}
              btnClass={
                statusFavorites ? 'exitHeaderBtnDialogue' : 'exitHeaderBtn'
              }
            />
          </div>
          <div className={s.wrapper}>
            <Button
              text="Обрані продавці"
              type="button"
              handleClick={() => onActive(false)}
              btnClass="exitHeaderBtn"
            />
          </div>
        </div>

        {/* <Text textClass="title" text="Обране" /> */}
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
    </Container>
  );
};

export default Favorites;
