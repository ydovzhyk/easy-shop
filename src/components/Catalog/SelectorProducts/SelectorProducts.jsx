import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from 'components/Shared/ProductItem/ProductItem';
import Pagination from 'components/Shared/Pagination/Pagination';

import { getProductsBySelector } from 'redux/product/product-operations';
import {
  getProductsBySelectorCard,
  getSelectorPages,
} from 'redux/product/product-selectors';
import { getID } from 'redux/auth/auth-selectors';

import s from './SelectorProducts.module.scss';

const SelectorProducts = ({ activeButton, activeNewRef }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSelector, setcurrentSelector] = useState('new');
  const [isLiked, setIsLiked] = useState(false);

  const arraySelectorProducts = useSelector(getProductsBySelectorCard);
  const selectorPages = useSelector(getSelectorPages);
  const userId = useSelector(getID);
  // console.log('arraySelectorProducts', arraySelectorProducts);
  // console.log('userId', userId);

  useEffect(() => {
    dispatch(
      getProductsBySelector({
        page: currentPage,
        selectorName: currentSelector,
      })
    );
  }, [dispatch, currentPage, currentSelector, isLiked]);

  useEffect(() => {
    if (activeButton !== currentSelector) {
      setCurrentPage(1);
      setcurrentSelector(activeButton);
    }
  }, [activeButton, currentPage, currentSelector]);

  // for pagination
  const handlePageChange = page => {
    setCurrentPage(page);
    scrollToNew();
  };

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

  // for scroling
  const scrollToNew = () => {
    activeNewRef.current.scrollIntoView({ behavior: 'smooth' });
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
      <Pagination
        totalPages={selectorPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default SelectorProducts;
