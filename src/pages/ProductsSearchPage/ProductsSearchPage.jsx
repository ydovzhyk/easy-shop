import { useEffect, useState, useMemo } from 'react';

import { Outlet, useSearchParams, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from 'redux/product/product-operations';
import { getHeaderFormErrors } from 'redux/product/product-selectors';
import { getHeaderFormReset } from 'redux/product/product-selectors';

import Filter from 'components/Filter/Filter';
import Container from 'components/Shared/Container/Container';
import { translateParamsToUA } from '../../funcs&hooks/translateParamsToUA.js';

const ProductsSearchPage = () => {
  const [filterData, setFilterData] = useState({});

  const { category, subcategory } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  const dispatch = useDispatch();
  const hasHeaderFormErrors = useSelector(getHeaderFormErrors);
  const shouldHeaderFormReset = useSelector(getHeaderFormReset);

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
    if (!hasHeaderFormErrors && searchQuery === '' && !shouldHeaderFormReset) {
      return;
    }
    dispatch(searchProducts(payload));
  }, [
    payload,
    hasHeaderFormErrors,
    shouldHeaderFormReset,
    searchQuery,
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
