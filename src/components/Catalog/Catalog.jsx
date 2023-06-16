import React from 'react';

import VipProducts from '../Catalog/VipProducts';

import s from './Catalog.module.scss';

const Catalog = () => {
  return (
    <section className={s.container}>
      <h3 className={s.titleText}>VIP-Оголошення</h3>
      <div className={s.styleButtonList}>
        <VipProducts />
      </div>
      <div className={s.titleText}>
        <h3 className={s.styleTitleText}>Новинки</h3>
        <h3 className={s.styleTitleText}>Знижки</h3>
        <h3 className={s.styleTitleText}>Топ-продавці</h3>
      </div>
      {/* <SelectorProducts />       */}
    </section>
  );
};

export default Catalog;
