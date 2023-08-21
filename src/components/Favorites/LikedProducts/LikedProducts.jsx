import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { NavLink } from 'react-router-dom';

import { getUserLikesBasket } from 'redux/auth/auth-operations';
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
  const dispatch = useDispatch();
  const [userLikesLength, setUserLikesLength] = useState(0);

  const user = useSelector(getUser);
  const userId = useSelector(getID);
  const likedProducts = useSelector(getLikedProducts);

  useEffect(() => {
    if (user && user.userLikes) {
      setUserLikesLength(user.userLikes.length);
    } else {
      setUserLikesLength(0);
    }
  }, [user]);

  // for likes
  const checkUserLike = productId => {
    const product = likedProducts.find(item => item._id === productId);

    if (product) {
      return product.userLikes.includes(userId);
    }
    return false;
  };

  // const handleLike = isLiked => {
  //   setIsLiked(isLiked);
  // };
  const handleLike = productId => {
    const product = likedProducts.find(item => item._id === productId);

    if (product) {
      // Видалити
      const updatedLikedProducts = [...likedProducts];
      updatedLikedProducts.splice(product, 1);
      dispatch(getUserLikesBasket(updatedLikedProducts));

      // Оновити
      dispatch(getUserLikesBasket(updatedLikedProducts));
    }
  };

  return (
    <>
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
    </>
  );
};

export default LikedProducts;
