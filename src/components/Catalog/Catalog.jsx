import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getProductsBySelectorCard,
//   getSelectorPages,
// } from 'redux/product/product-selectors';

import VipProducts from '../Catalog/VipProducts/VipProducts';
import SelectorProducts from '../Catalog/SelectorProducts/SelectorProducts';

import Text from 'components/Shared/Text/Text';
import s from './Catalog.module.scss';

const Catalog = () => {
  // const dispatch = useDispatch();

  const [activeButton, setActiveButton] = useState('new');
  // const [currentPage, setCurrentPage] = useState(1);
  // const selectorPages = useSelector(getSelectorPages);

  const handleButtonClick = buttonName => {
    setActiveButton(buttonName);
    // Додати код для обробки кліку на кнопку
  };

  // const handlePrevPage = () => {
  //   if (currentPage > 1) {
  //     setCurrentPage(currentPage - 1);
  //   }
  // };

  // const handleNextPage = () => {
  //   // const selectorPages =
  //   if (currentPage < selectorPages) {
  //     setCurrentPage(currentPage + 1);
  //   }
  // };

  return (
    <section className={s.container}>
      <Text text={'VIP-Оголошення'} textClass="catalogTitle" />

      <VipProducts />

      <div className={s.styleWrapButton}>
        <button
          className={
            activeButton === 'new' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('new')}
        >
          Новинки
        </button>
        <button
          className={
            activeButton === 'sale' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('sale')}
        >
          Знижки
        </button>
        <button
          className={
            activeButton === 'advice' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('advice')}
        >
          Популярні
        </button>
      </div>

      <SelectorProducts
        activeButton={activeButton}
        // currentPage={currentPage}
      //   handlePrevPage={handlePrevPage}
      //   handleNextPage={handleNextPage}
       />
    </section>
  );
};

export default Catalog;
