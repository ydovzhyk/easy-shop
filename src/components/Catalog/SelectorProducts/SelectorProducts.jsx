import React, { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ProductItem from 'components/Shared/ProductItem/ProductItem';
import Pagination from 'components/Shared/Pagination/Pagination';

import { getProductsBySelector } from 'redux/product/product-operations';
import {
  getProductsBySelectorCard,
  getSelectorPages,
} from 'redux/product/product-selectors';

import s from './SelectorProducts.module.scss';

const SelectorProducts = ({ activeButton, activeNewRef }) => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSelector, setcurrentSelector] = useState('new');
  const arraySelectorProducts = useSelector(getProductsBySelectorCard);

  const selectorPages = useSelector(getSelectorPages);

  useEffect(() => {
    dispatch(
      getProductsBySelector({
        page: currentPage,
        selectorName: currentSelector,
      })
    );
  }, [dispatch, currentPage, currentSelector]);

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

  // for scroling
  const scrollToNew = () => {
    activeNewRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <ul className={s.listCard} >
        {arraySelectorProducts.map(item => (
          <ProductItem
            key={item._id}
            _id={item._id}
            mainPhotoUrl={item.mainPhotoUrl}
            price={item.price}
            nameProduct={item.nameProduct}
            description={item.description}
            size={item.size}
            section={item.section}
            category={item.category}
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
