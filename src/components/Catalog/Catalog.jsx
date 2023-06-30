import React, { useState, useRef } from 'react';

import VipProducts from '../Catalog/VipProducts/VipProducts';
import SelectorProducts from '../Catalog/SelectorProducts/SelectorProducts';

import Text from 'components/Shared/Text/Text';
import s from './Catalog.module.scss';

const Catalog = () => {
  const activeNewRef = useRef();
  const [activeButton, setActiveButton] = useState('new');

  const handleButtonClick = buttonName => {
    setActiveButton(buttonName);
  };

  return (
    <section className={s.container}>
      <Text text={'VIP-Оголошення'} textClass="catalogTitle" />

      <VipProducts />

      <div className={s.styleWrapButton} ref={activeNewRef}>
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
        activeNewRef={activeNewRef}
       />
    </section>
  );
};

export default Catalog;
