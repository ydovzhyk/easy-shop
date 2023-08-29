import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useLocation, useNavigate } from 'react-router-dom';

import ProductItem from '../../Shared/ProductItem/ProductItem';
import Pagination from 'components/Shared/Pagination/Pagination';

import { getVipProducts } from 'redux/product/product-operations';
import {
  getVipProductCard,
  getVipPages,
} from 'redux/product/product-selectors';
import { getID } from 'redux/auth/auth-selectors';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import s from './VipProducts.module.scss';

const VipProducts = () => {
  const dispatch = useDispatch();
  const locationVip = useLocation();
  const navigate = useNavigate();

  const [activePage, setActivePage] = useState(1);
  const [activeButton, setActiveButton] = useState('vip');
  const [isLiked, setIsLiked] = useState(false);

  const arrayVipProducts = useSelector(getVipProductCard);
  const vipPages = useSelector(getVipPages);
  const userId = useSelector(getID);
  const isDesktop = useMediaQuery({ minWidth: 1280 });

  useEffect(() => {
    const searchParamsVip = new URLSearchParams(locationVip.search);
    const categoryParamVip = searchParamsVip.get('category');
    const pageParamVip = searchParamsVip.get('page');
    if (pageParamVip && categoryParamVip && categoryParamVip !== 'vip') {
      return;
    }
    if (pageParamVip && categoryParamVip && categoryParamVip === 'vip') {
      setActivePage(Number(pageParamVip));
      setActiveButton(categoryParamVip);
    }
  }, [locationVip.search, activePage, activeButton]);

  useEffect(() => {
    dispatch(getVipProducts(activePage));
  }, [dispatch, activePage, isLiked]);

  useEffect(() => {
    const searchParamsVip = new URLSearchParams(window.location.search);
    const categoryParamVip = searchParamsVip.get('category');

    if (categoryParamVip === 'vip') {
      scrollToTop();
    }
  }, [arrayVipProducts]);

  // for page
  const handlePrevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1);
      updateUrlParamsVip({ category: activeButton, page: activePage - 1 });
    }
  };

  const handleNextPage = () => {
    if (activePage < vipPages) {
      setActivePage(activePage + 1);
      updateUrlParamsVip({ category: activeButton, page: activePage + 1 });
    }
  };

  // for pagination
  const handlePageChange = page => {
    setActivePage(page);
    updateUrlParamsVip({ category: activeButton, page: page });
  };

  // for likes
  const checkUserLike = productId => {
    const product = arrayVipProducts.find(item => item._id === productId);
    if (product) {
      return product.userLikes.includes(userId);
    }
    return false;
  };

  const handleLike = isLiked => {
    setIsLiked(isLiked);
  };

  // for scroling
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateUrlParamsVip = paramsObjVip => {
    const searchParamsVip = new URLSearchParams(locationVip.search);
    searchParamsVip.set('category', paramsObjVip.category);
    searchParamsVip.set('page', paramsObjVip.page);

    const newUrl = `${window.location.pathname}?${searchParamsVip.toString()}`;
    navigate(newUrl);
  };

  return (
    <div>
      <div className={s.styleButtonList}>
        {isDesktop && (
          <>
            {activePage > 1 && (
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
        {isDesktop && (
          <>
            {activePage < vipPages && (
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
              currentPage={activePage}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VipProducts;
