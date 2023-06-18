import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from '../../Shared/ProductItem/ProductItem';

import { getVipProducts } from 'redux/product/product-operations';
import {
  getVipProductCard,
  getVipPages,
} from 'redux/product/product-selectors';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import s from './VipProducts.module.scss';

const VipProducts = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const arrayVipProducts = useSelector(getVipProductCard);
  const vipPages = useSelector(getVipPages);

  useEffect(() => {
    dispatch(getVipProducts(currentPage));
  }, [dispatch, currentPage]);
  console.log(arrayVipProducts);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < vipPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className={s.styleButtonList}>
      {currentPage > 1 && (
        <div
          className={`${s.arrowButton} ${s.arrowButtonLeft}`}
          onClick={handlePrevPage}
        >
          <FiChevronLeft
            size={60}
            strokeWidth={1}
            className={s.arrowlinkLeft}
          />
        </div>
      )}
      <ul className={s.listCard}>
        {arrayVipProducts.map(item => (
          <ProductItem
            key={item._id}
            mainPhotoUrl={item.mainPhotoUrl}
            price={item.price}
            nameProduct={item.nameProduct}
            description={item.description}
            section={item.section}
            category={item.category}
          />
        ))}
      </ul>
      {currentPage < vipPages && (
        <div
          className={`${s.arrowButton} ${s.arrowButtonRight}`}
          onClick={handleNextPage}
        >
          <FiChevronRight
            size={60}
            strokeWidth={1}
            className={s.arrowlinkRigth}
          />
        </div>
      )}
    </div>
  );
};

export default VipProducts;
