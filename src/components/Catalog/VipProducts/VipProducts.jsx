import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import ProductItem from '../../Shared/ProductItem/ProductItem';
import Pagination from 'components/Shared/Pagination/Pagination';

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
  const isDesktop = useMediaQuery({ minWidth: 1280 });
  console.log(arrayVipProducts);

  useEffect(() => {
    dispatch(getVipProducts(currentPage));
  }, [dispatch, currentPage]);

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

  // for pagination
  const handlePageChange = page => {
    setCurrentPage(page);
    scrollToTop();
  };

  // for scroling
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <div className={s.styleButtonList}>
        {isDesktop && (
          <>
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
          </>
        )}
        <ul className={s.listCard}>
          {arrayVipProducts.map(item => (
            <ProductItem
              key={item._id}
              _id={item._id}
              mainPhotoUrl={item.mainPhotoUrl}
              price={item.price}
              likes={item.userLikes.length ? item.userLikes.length : 0}
              nameProduct={item.nameProduct}
              description={item.description}
              size={item.size}
              section={item.section}
              category={item.category}
            />
          ))}
        </ul>
        {isDesktop && (
          <>
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
          </>
        )}
      </div>

      <div>
        {!isDesktop && (
          <div>
            <Pagination
              totalPages={vipPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VipProducts;
