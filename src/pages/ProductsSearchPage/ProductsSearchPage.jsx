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
    if (!isFilterFormSubmitted) {
      return;
    }
    if (shouldFilterFormReset) {
      if (searchQuery === '') {
        setSearchParams({});
      }
      if (searchQuery !== '') {
        setSearchParams({ search: searchQuery });
      }
      return;
    }

    const selectedFilterValues = getUrlFilterValues(payload.filterData);

    if (searchQuery === '') {
      setSearchParams({
        ...selectedFilterValues,
      });
    }

    if (searchQuery !== '' && isFilterFormSubmitted) {
      setSearchParams({
        search: searchQuery,
        ...selectedFilterValues,
      });
    }
    if (searchQuery !== '' && !isFilterFormSubmitted) {
      setSearchParams({
        search: searchQuery,
      });
    }
  }, [
    searchQuery,
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

    const selectedFilterValues = getUrlFilterValues(payload.filterData);

    if (currentPage > 1) {
      searchQuery === ''
        ? setSearchParams({
            ...selectedFilterValues,
            page: currentPage,
          })
        : setSearchParams({
            search: searchQuery,
            ...selectedFilterValues,
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
