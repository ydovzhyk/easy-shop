import { useEffect, useState, useMemo } from 'react';

import { Outlet, useSearchParams, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from 'redux/product/product-operations';
import {
  getHeaderFormErrors,
  getHeaderFormReset,
  getHeaderFormClick,
  getCurrentProductsPage,
  getFilterForm,
  getFilterProduct,
} from 'redux/product/product-selectors';

import Filter from 'components/Filter/Filter';
import Container from 'components/Shared/Container/Container';
import { translateParamsToUA } from '../../funcs&hooks/translateParamsToUA.js';

const ProductsSearchPage = () => {
  const [filterData, setFilterData] = useState({});
  const { category, subcategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = window.sessionStorage.getItem('searchQuery') ?? '';
  // searchParams.get('search') ?? '';

  const dispatch = useDispatch();
  const isHeaderFormClicked = useSelector(getHeaderFormClick);
  const hasHeaderFormErrors = useSelector(getHeaderFormErrors);
  const shouldHeaderFormReset = useSelector(getHeaderFormReset);
  const currentPage = useSelector(getCurrentProductsPage);
  const shouldFilterFormReset = useSelector(getFilterProduct);
  const isFilterFormSubmitted = useSelector(getFilterForm);

  const payload = useMemo(() => {
    return {
      searchQuery,
      section: !category ? '' : translateParamsToUA(category).categoryName,
      category: !subcategory
        ? ''
        : translateParamsToUA(category, subcategory).subCategoryName,
      filterData,
    };
  }, [category, subcategory, searchQuery, filterData]);

  useEffect(() => {
    if (!isFilterFormSubmitted) {
      return;
    }
    if (shouldFilterFormReset) {
      setSearchParams({});
      return;
    }
    let brandName = '';
    let condition = '';
    let price = '';
    let price_from = '';
    let price_to = '';

    Object.entries(payload.filterData).forEach(([key, value]) => {
      if (key === 'filterPrice') {
        price = value;
      }
      if (key === 'filterPriceFrom') {
        price_from = value;
      }
      if (key === 'filterPriceTo') {
        price_to = value;
      }
      if (key === 'brandName') {
        brandName = value;
      }
      if (key === 'condition' && value.length < 1) {
        condition = '';
      }
      if (key === 'condition' && value.length > 0) {
        condition = value.join(',');
      }
    });

    setSearchParams({ brandName, condition, price, price_from, price_to });
  }, [
    shouldFilterFormReset,
    isFilterFormSubmitted,
    payload.filterData,
    setSearchParams,
  ]);

  useEffect(() => {
    if (
      !hasHeaderFormErrors &&
      searchQuery === '' &&
      !shouldHeaderFormReset &&
      isHeaderFormClicked
    ) {
      return;
    }
    let brandName = '';
    let condition = '';
    let price = '';
    let price_from = '';
    let price_to = '';

    Object.entries(payload.filterData).forEach(([key, value]) => {
      if (key === 'filterPrice') {
        price = value;
      }
      if (key === 'filterPriceFrom') {
        price_from = value;
      }
      if (key === 'filterPriceTo') {
        price_to = value;
      }
      if (key === 'brandName') {
        brandName = value;
      }
      if (key === 'condition' && value.length < 1) {
        condition = '';
      }
      if (key === 'condition' && value.length > 0) {
        condition = value.join(',');
      }
    });

    // if (searchQuery !== '') {
    //   setSearchParams({
    //     search: searchQuery,
    //     brandName,
    //     condition,
    //     price,
    //     price_from,
    //     price_to,
    //   });
    // }

    if (currentPage > 1) {
      searchQuery === ''
        ? setSearchParams({
            brandName,
            condition,
            price,
            price_from,
            price_to,
            page: currentPage,
          })
        : setSearchParams({
            search: searchQuery,
            brandName,
            condition,
            price,
            price_from,
            price_to,
            page: currentPage,
          });
    }
    dispatch(
      searchProducts({
        payloadData: payload,
        page: currentPage,
      })
    );
  }, [
    payload,
    hasHeaderFormErrors,
    shouldHeaderFormReset,
    searchQuery,
    isHeaderFormClicked,
    currentPage,
    setSearchParams,
    dispatch,
  ]);

  const dataFilterHandler = dataFilter => {
    setFilterData(dataFilter);
  };

  return (
    <div>
      <Container>
        <div
          style={{
            display: 'flex',
            padding: '20px 0',
          }}
        >
          <Filter onChange={dataFilterHandler} />
          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default ProductsSearchPage;
