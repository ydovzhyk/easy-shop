import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import VipProducts from '../Catalog/VipProducts/VipProducts';
import SelectorProducts from '../Catalog/SelectorProducts/SelectorProducts';

// import { getNewProducts } from 'redux/product/product-operations';
// import {
//   getNewProductCard,
//   getNewPages,
// } from 'redux/product/product-selectors';

import Text from 'components/Shared/Text/Text';
import s from './Catalog.module.scss';

const Catalog = () => {
  // const dispatch = useDispatch();
  // const activeButton = useSelector(getNewProductCard);
  // const catalogData = useSelector(getNewPages);
  const [activeButton, setActiveButton] = useState('Новинки');

  // useEffect(() => {
  //   dispatch(getNewProducts(activeButton));
  // }, [dispatch, activeButton]);

  const handleButtonClick = buttonName => {
    setActiveButton(buttonName);
    // Додайте код для обробки кліку на кнопку
  };

  return (
    <section className={s.container}>
      <Text text={'VIP-Оголошення'} textClass="catalogTitle" />
      {/* <h3 className={s.titleText}>VIP-Оголошення</h3> */}

      <VipProducts />

      <div className={s.styleWrapButton}>
        <button
          className={
            activeButton === 'Новинки' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('Новинки')}
        >
          Новинки
        </button>
        <button
          className={
            activeButton === 'Знижки' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('Знижки')}
        >
          Знижки
        </button>
        <button
          className={
            activeButton === 'Топ-продавці'
              ? `${s.button} ${s.active}`
              : s.button
          }
          onClick={() => handleButtonClick('Топ-продавці')}
        >
          Топ-продавці
        </button>
      </div>
      {/* <div className={s.titleText}>
        <h3 className={s.styleTitleText}>Новинки</h3>
        <h3 className={s.styleTitleText}>Знижки</h3>
        <h3 className={s.styleTitleText}>Топ-продавці</h3>
      </div> */}
      <SelectorProducts />
    </section>
  );
};

export default Catalog;
