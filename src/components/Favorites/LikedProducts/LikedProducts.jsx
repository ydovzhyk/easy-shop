import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserLikesBasket } from 'redux/auth/auth-operations';
import {
  getID,
  getLikedProducts,
  getTotalLikedProductsPages,
} from 'redux/auth/auth-selectors';

import ProductItem from 'components/Shared/ProductItem/ProductItem';
import Pagination from 'components/Shared/Pagination/Pagination';
import Text from 'components/Shared/Text/Text';

import s from 'components/Favorites/LikedProducts/LikedProducts.module.scss';

const LikedProducts = () => {
  const dispatch = useDispatch();

  const [isLiked, setIsLiked] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const userId = useSelector(getID);
  const likedProducts = useSelector(getLikedProducts);
  const totalLikedPages = useSelector(getTotalLikedProductsPages);

  useEffect(() => {
    dispatch(getUserLikesBasket({ currentPage }));

    setIsLiked(false);
  }, [dispatch, isLiked, currentPage]);

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

  // for scroling
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // for pagination
  const handlePageChange = page => {
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <>
      {likedProducts && (
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
      )}
      {likedProducts && likedProducts.length === 0 && (
        <Text
          text={'У вас немає обраних товарів'}
          textClass="after-title-text-warning"
        />
      )}
      {totalLikedPages > 1 && (
        <Pagination
          totalPages={totalLikedPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default LikedProducts;
