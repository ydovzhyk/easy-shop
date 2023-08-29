import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from 'components/Shared/ProductItem/ProductItem';
import { getProductsBySelector } from 'redux/product/product-operations';
import { getProductsBySelectorCard } from 'redux/product/product-selectors';
import { getID } from 'redux/auth/auth-selectors';

import s from './SelectorProducts.module.scss';

const SelectorProducts = ({ currentButton, currentPage }) => {
  const dispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);

  const arraySelectorProducts = useSelector(getProductsBySelectorCard);
  const userId = useSelector(getID);

  useEffect(() => {
    dispatch(
      getProductsBySelector({
        page: currentPage,
        selectorName: currentButton,
      })
    );
  }, [dispatch, currentPage, currentButton, isLiked]);

  // for likes
  const checkUserLike = productId => {
    const product = arraySelectorProducts.find(item => item._id === productId);
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
        {arraySelectorProducts.map(item => (
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

export default SelectorProducts;
