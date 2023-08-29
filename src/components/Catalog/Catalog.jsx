import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { getSelectorPages } from 'redux/product/product-selectors';
import { getProductsBySelectorCard } from 'redux/product/product-selectors';

import VipProducts from '../Catalog/VipProducts/VipProducts';
import SelectorProducts from '../Catalog/SelectorProducts/SelectorProducts';
import Pagination from 'components/Shared/Pagination/Pagination';

import Text from 'components/Shared/Text/Text';
import s from './Catalog.module.scss';

const Catalog = () => {
  const activeNewRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const selectorPages = useSelector(getSelectorPages);
  const arrayProduct = useSelector(getProductsBySelectorCard);

  const [currentButton, setCurrentButton] = useState('new');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    const pageParam = searchParams.get('page');

    if (pageParam && categoryParam && categoryParam === 'vip') {
      return;
    }

    if (pageParam && categoryParam && categoryParam !== 'vip') {
      setCurrentPage(Number(pageParam));
      setCurrentButton(categoryParam);
    }
  }, [location.search, currentButton, currentPage]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const categoryParam = searchParams.get('category');

    if (
      categoryParam === 'new' ||
      categoryParam === 'sale' ||
      categoryParam === 'advice'
    ) {
      scrollToNew();
    }
  }, [arrayProduct]);

  const handleButtonClick = buttonName => {
    setCurrentButton(buttonName);
    setCurrentPage(1);
    updateUrlParams({ category: buttonName, page: 1 });
  };

  const handlePageChange = page => {
    setCurrentPage(page);
    updateUrlParams({ category: currentButton, page: page });
  };

  const updateUrlParams = paramsObj => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set('category', paramsObj.category);
    searchParams.set('page', paramsObj.page);

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    navigate(newUrl);
  };

  const scrollToNew = () => {
    activeNewRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={s.container}>
      <Text text={'VIP-Оголошення'} textClass="catalogTitle" />

      <VipProducts />

      <div className={s.styleWrapButton} ref={activeNewRef}>
        <button
          className={
            currentButton === 'new' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('new')}
        >
          Новинки
        </button>
        <button
          className={
            currentButton === 'sale' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('sale')}
        >
          Знижки
        </button>
        <button
          className={
            currentButton === 'advice' ? `${s.button} ${s.active}` : s.button
          }
          onClick={() => handleButtonClick('advice')}
        >
          Популярні
        </button>
      </div>

      <SelectorProducts
        currentButton={currentButton}
        currentPage={currentPage}
      />

      <Pagination
        totalPages={selectorPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </section>
  );
};

export default Catalog;
