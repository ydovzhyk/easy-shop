import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';

import {
  getID,
  getUser,
  //   getUserDateCreate,
  getLikedProducts,
  //   getTotalLikedProductsPages,
} from 'redux/auth/auth-selectors';
// import { updateUserSubscriptions } from 'redux/otherUser/otherUser-operations';
// import {
//   selectUserSubscriptions,
//   selectTotalPagesUserSubscription,
// } from 'redux/otherUser/otherUser-selectors';

// import Container from 'components/Shared/Container';
import ProductItem from 'components/Shared/ProductItem/ProductItem';
// import Pagination from 'components/Shared/Pagination/Pagination';
// import Button from 'components/Shared/Button';
// import Text from 'components/Shared/Text/Text';

import s from 'components/Favorites/LikedProducts/LikedProducts.module.scss';

// const TabTypes = {
//   PRODUCTS: 'products',
//   SELLERS: 'sellers',
// };

const LikedProducts = () => {
  const [userLikesLength, setUserLikesLength] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const user = useSelector(getUser);
  const userId = useSelector(getID);

  const likedProducts = useSelector(getLikedProducts);

  useEffect(() => {
    if (user && user.userLikes) {
      setUserLikesLength(user.userLikes.length);
    } else {
      setUserLikesLength(0);
    }
  }, [user, userLikesLength]);

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
    <>
      <ul className={s.listCard}>
        {likedProducts.map(item => (
          <ProductItem
            key={item._id}
            _id={item._id}
            userId={userId}
            mainPhotoUrl={item.mainPhotoUrl}
            price={item.price}
            likes={item.userLikes.length ? item.userLikes.length : 0}
            userLike={checkUserLike(item._id)}
            isLiked={isLiked}
            handleLike={handleLike}
            nameProduct={item.nameProduct}
            owner={item.owner}
            description={item.description}
            size={item.size}
            section={item.section}
            category={item.category}
            vip={item.vip}
            sale={item.sale}
          />
        ))}
      </ul>
    </>
  );
};

export default LikedProducts;
