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
import { getUrlFilterValues } from '../../funcs&hooks/getUrlFilterValues.js';
import { translateParamsToUA } from '../../funcs&hooks/translateParamsToUA.js';

const ProductsSearchPage = () => {
  const [filterData, setFilterData] = useState({});
  const { category, subcategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

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
    if (!shouldFilterFormReset) {
      return;
    }
    searchParams.delete('size');
    searchParams.delete('price');
    searchParams.delete('condition');
    searchParams.delete('brand');
    searchParams.delete('price_from');
    searchParams.delete('price_to');
    searchParams.delete('page');
    setSearchParams(searchParams);
  }, [setSearchParams, searchParams, shouldFilterFormReset]);

  useEffect(() => {
    if (!isFilterFormSubmitted) {
      return;
    }

    if (shouldFilterFormReset) {
      searchParams.delete('size');
      searchParams.delete('price');
      searchParams.delete('condition');
      searchParams.delete('brand');
      searchParams.delete('price_from');
      searchParams.delete('price_to');
      searchParams.delete('page');
      setSearchParams(searchParams);
      return;
    }

    const selectedFilterValues = getUrlFilterValues(payload.filterData);

    Object.entries(selectedFilterValues).map(([name, value]) =>
      searchParams.set(name, value)
    );
    setSearchParams(searchParams);
  }, [
    searchQuery,
    shouldFilterFormReset,
    isFilterFormSubmitted,
    payload.filterData,
    searchParams,
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

    if (currentPage > 1) {
      searchParams.set('page', currentPage);
      setSearchParams(searchParams);
    }
    dispatch(
      searchProducts({
        payloadData: payload,
        page: currentPage,
      })
    );
  }, [
    payload,
    searchParams,
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
