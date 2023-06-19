import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from 'components/Shared/ProductItem/ProductItem';

import { getProductsBySelector } from 'redux/product/product-operations';
import {
  getProductsBySelectorCard,
  // getSelectorPages,
} from 'redux/product/product-selectors';

import s from './SelectorProducts.module.scss';

const SelectorProducts = ({
  activeButton,
}) => {
  console.log(activeButton);
  const dispatch = useDispatch();
  const [currentPage] = useState(1);
  const [currentSelector, setcurrentSelector] = useState('new');
  const arraySelectorProducts = useSelector(getProductsBySelectorCard);
  // const selectorPages = useSelector(getSelectorPages);

  useEffect(() => {
    dispatch(
      getProductsBySelector({
        page: currentPage,
        selectorName: currentSelector,
      })
    );
  }, [dispatch, currentPage, currentSelector]);

  useEffect(() => {
    if (activeButton === 'new') {
      return;
    }
    setcurrentSelector(activeButton);
  }, [activeButton]);
  // console.log(arrayVipProducts);

  return (
    <>
      <ul className={s.listCard}>
        {arraySelectorProducts.map(item => (
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
      {/* <div className={s.pagination}>
        <button className={s.paginationButton} onClick={handlePrevPage}>
          &lt;
        </button>
        <button className={s.paginationButton}>{currentPage - 1}</button>
        <button className={s.paginationButton}>{currentPage}</button>
        <button className={s.paginationButton}>{currentPage + 1}</button>
        <button className={s.paginationButton} onClick={handleNextPage}>
          &gt;
        </button>
      </div> */}
    </>
  );
};

export default SelectorProducts;
