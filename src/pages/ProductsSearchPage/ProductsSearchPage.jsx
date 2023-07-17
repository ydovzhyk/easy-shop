import { useEffect, useState, useMemo } from 'react';

import { Outlet, useSearchParams, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from 'redux/product/product-operations';
import { getHeaderFormErrors } from 'redux/product/product-selectors';
import { getHeaderFormReset } from 'redux/product/product-selectors';
import { getHeaderFormClick } from 'redux/product/product-selectors';

// import Pagination from 'components/Shared/Pagination/Pagination';
import Filter from 'components/Filter/Filter';
import Container from 'components/Shared/Container/Container';
import { translateParamsToUA } from '../../funcs&hooks/translateParamsToUA.js';

const ProductsSearchPage = () => {
  const [filterData, setFilterData] = useState({});
  // const [currentPage, setCurrentPage] = useState(1);

  const { category, subcategory } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';

  const dispatch = useDispatch();
  const isHeaderFormClicked = useSelector(getHeaderFormClick);
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
    if (
      !hasHeaderFormErrors &&
      searchQuery === '' &&
      !shouldHeaderFormReset &&
      isHeaderFormClicked
    ) {
      return;
    }
    dispatch(searchProducts(payload));
    // dispatch(
    //   searchProducts({
    //     payloadData: payload,
    //     page: currentPage,
    //   })
    // );
  }, [
    payload,
    hasHeaderFormErrors,
    shouldHeaderFormReset,
    searchQuery,
    isHeaderFormClicked,
    dispatch,
  ]);

  //   const handlePageChange = page => {
  //     setCurrentPage(page);
  //   };

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
        {/* <Pagination
              totalPages={selectorPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            /> */}
      </Container>
    </div>
  );
};

export default ProductsSearchPage;
