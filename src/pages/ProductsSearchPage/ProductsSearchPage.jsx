import { useEffect, useMemo } from 'react';

import { Outlet, useSearchParams, useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from 'redux/product/product-operations';
import {
  getHeaderFormErrors,
  getHeaderFormReset,
  getHeaderFormClick,
  getCurrentProductsPage,
  getFilterProduct,
  getShownFilterInMobile,
} from 'redux/product/product-selectors';
import { setCurrentProductsPage } from 'redux/product/product-slice';

import Filter from 'components/Filter/Filter';
import Container from 'components/Shared/Container/Container';
import { filterPrices } from 'components/Filter/filterPrice';
import { filterConditions } from 'components/Filter/filterСonditions';
import sizeOption from 'components/AddProduct/Size/sizeTable.json';
import { getUrlFilterValues } from '../../funcs&hooks/getUrlFilterValues.js';
import { translateParamsToUA } from '../../funcs&hooks/translateParamsToUA.js';
import useScreenResizing from '../../funcs&hooks/useScreenResizing';

import s from './ProductsSearchPage.module.scss';

const ProductsSearchPage = () => {
  const { category, subcategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const brandName = searchParams.get('brand') ?? '';
  const filterPriceFrom = searchParams.get('price_from') ?? '0';
  const filterPriceTo = searchParams.get('price_to') ?? '1000000';
  const filterPrice = searchParams.get('price') ?? '';
  const condition = searchParams.get('condition') ?? '';
  const size = searchParams.get('size') ?? '';
  const pageParam = searchParams.get('page');

  const dispatch = useDispatch();
  const isHeaderFormClicked = useSelector(getHeaderFormClick);
  const hasHeaderFormErrors = useSelector(getHeaderFormErrors);
  const shouldHeaderFormReset = useSelector(getHeaderFormReset);
  const currentPage = useSelector(getCurrentProductsPage);
  const shouldFilterFormReset = useSelector(getFilterProduct);
  const showFilterInMobile = useSelector(getShownFilterInMobile);

  const viewPort = useScreenResizing();
  const isMobile = viewPort.width < 768;

  const payload = useMemo(() => {
    let selectedConditionsArray = [];
    let selectedSizesArray = [];
    if (condition !== '') {
      const selectedConditionsIndexArray = condition.split('_');
      selectedConditionsArray = selectedConditionsIndexArray.map(
        el => filterConditions[Number(el)]
      );
    }

    if (size !== '') {
      const selectedIndexSizesArray = size.split('_');

      for (const [key, value] of Object.entries(sizeOption)) {
        for (let i = 0; i < selectedIndexSizesArray.length; i += 1) {
          if (selectedIndexSizesArray[i] === key) {
            selectedSizesArray.push([{ name: key, value: value }]);
          }
        }
      }
    }
    return {
      searchQuery,
      section: !category ? '' : translateParamsToUA(category).categoryName,
      category: !subcategory
        ? ''
        : translateParamsToUA(category, subcategory).subCategoryName,
      filterData: {
        brandName,
        condition: selectedConditionsArray,
        filterPrice: filterPrices[filterPrice] ?? '',
        filterPriceFrom,
        filterPriceTo,
        size: JSON.stringify(selectedSizesArray),
      },
    };
  }, [
    category,
    subcategory,
    searchQuery,
    brandName,
    size,
    condition,
    filterPrice,
    filterPriceFrom,
    filterPriceTo,
  ]);

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
    if (!pageParam) {
      return;
    }
    dispatch(setCurrentProductsPage(Number(pageParam)));
  }, [pageParam, dispatch]);

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

    if (currentPage === 1) {
      searchParams.delete('page');
      setSearchParams(searchParams);
    }
    // console.log(currentPage);

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
    const selectedFilterValues = getUrlFilterValues(dataFilter);
    searchParams.delete('size');
    searchParams.delete('price');
    searchParams.delete('condition');
    searchParams.delete('brand');
    searchParams.delete('price_from');
    searchParams.delete('price_to');
    searchParams.delete('page');
    Object.entries(selectedFilterValues).map(([name, value]) => {
      return searchParams.set(name, value);
    });
    setSearchParams(searchParams);
  };

  return (
    <div>
      <Container>
        <div className={s.mainWrapper}>
          {isMobile && showFilterInMobile && (
            <Filter onChange={dataFilterHandler} />
          )}
          {isMobile && !showFilterInMobile && <Outlet />}
          {!isMobile && (
            <>
              <Filter onChange={dataFilterHandler} />
              <Outlet />
            </>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductsSearchPage;
