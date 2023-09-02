import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, useParams, useLocation } from 'react-router-dom';

import { HiOutlineStar, HiStar } from 'react-icons/hi';
import { MdClose } from 'react-icons/md';
import { BsFilter } from 'react-icons/bs';

import { useForm, Controller } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import {
  getLoadingProducts,
  getProductsByQuery,
  getFilterForm,
  getCurrentProductsPage,
  getHeaderFormErrors,
  getProductsByQueryPages,
} from 'redux/product/product-selectors';
import { getLogin, getUserMessage, getUser } from 'redux/auth/auth-selectors';
import { updateSearchUserSibscribes } from 'redux/auth/auth-operations';
import {
  resetHeaderForm,
  setCurrentProductsPage,
  resetFilterProduct,
  showFilterInMobile,
} from 'redux/product/product-slice';

import Pagination from 'components/Shared/Pagination/Pagination';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import TopNavProducts from 'components/Shared/TopNavProducts/TopNavProducts';
import ProductItem from 'components/Shared/ProductItem/ProductItem';
import Text from 'components/Shared/Text/Text';
import NotFound from 'components/NotFound/NotFound';
import SelectField from 'components/Shared/SelectField/SelectField';
import options from './options';
import useScreenResizing from '../../funcs&hooks/useScreenResizing';
import { scrollToTop } from '../../funcs&hooks/scrollToTop';

import s from './Products.module.scss';

const Products = () => {
  const [filterSelected, setFilterSelected] = useState('');
  const [isMessage, setIsMessage] = useState('');
  const message = useSelector(getUserMessage);
  const user = useSelector(getUser);
  const currentPage = useSelector(getCurrentProductsPage);
  const hasHeaderFormErrors = useSelector(getHeaderFormErrors);
  const totalPages = useSelector(getProductsByQueryPages);

  const { category, subcategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { pathname, search } = useLocation();
  const sort = searchParams.get('sort') ?? '';
  // const page = searchParams.get('page');

  const products = useSelector(getProductsByQuery);
  const isFilterFormSubmitted = useSelector(getFilterForm);
  const isLoading = useSelector(getLoadingProducts);
  const isUserLogin = useSelector(getLogin);
  const dispatch = useDispatch();

  const { control } = useForm();

  const viewPort = useScreenResizing();
  const isMobile = viewPort.width < 768;

  useEffect(() => {
    setIsMessage(message);
  }, [message]);

  const resetMessage = () => {
    setIsMessage('');
  };

  const isSubscribedSearch = () => {
    const subscribedSearchArray = user.userSearchSubscription;
    const currentUrl = pathname + search;
    return subscribedSearchArray.includes(currentUrl);
  };

  const handleChangeFilter = async filterSelected => {
    await setFilterSelected(filterSelected);
  };

  useEffect(() => {
    if (sort === '') {
      return;
    }
    setFilterSelected(options[Number(sort)]);
  }, [sort]);

  const productsToRender = useMemo(() => {
    let productsState = [...products];
    const selectedSortIndex = options.findIndex(el => el === filterSelected);

    switch (filterSelected) {
      case 'Популярні':
        searchParams.delete('sort');
        setSearchParams(searchParams);
        return productsState;

      case 'Від найдешевших':
        searchParams.set('sort', selectedSortIndex);
        setSearchParams(searchParams);
        return productsState.slice(0).sort((a, b) => a.price - b.price);

      case 'Від найдорожчих':
        searchParams.set('sort', '2');
        setSearchParams(searchParams);
        return productsState.slice(0).sort((a, b) => b.price - a.price);

      case 'За датою':
        searchParams.set('sort', '3');
        setSearchParams(searchParams);
        return productsState
          .slice(0)
          .sort((a, b) => -a.date.localeCompare(b.date));

      default:
        return productsState;
    }
  }, [products, filterSelected, searchParams, setSearchParams]);

  const searchQuery =
    JSON.parse(window.sessionStorage.getItem('searchQuery')) ?? '';

  const handleClearSearchQueryClick = async () => {
    await searchParams.delete('search');
    await setSearchParams(searchParams);
    await window.sessionStorage.removeItem('searchQuery');
    await dispatch(resetHeaderForm());
    await dispatch(setCurrentProductsPage(1));
  };

  const hasUrlSearchParams =
    searchParams.get('price') ||
    searchParams.get('size') ||
    searchParams.get('condition') ||
    searchParams.get('brand') ||
    searchParams.get('price_from') ||
    searchParams.get('price_to');

  const handleClearFiltersClick = async () => {
    await dispatch(resetFilterProduct());
    await dispatch(setCurrentProductsPage(1));
  };

  const handlePageChange = page => {
    dispatch(setCurrentProductsPage(page));
    scrollToTop();
  };

  const getClassName = () => {
    return !isUserLogin ? `${s.selectWrapper}` : `${s.bottomOptionsWrapper}`;
  };

  const handleSubscribtionClick = () => {
    dispatch(
      updateSearchUserSibscribes({ urlSubscription: pathname + search })
    );
  };

  const handleShowFilterClick = () => {
    dispatch(showFilterInMobile());
  };

  return (
    <section style={{ flexGrow: 1, position: 'relative' }}>
      <div className={s.container}>
        <TopNavProducts
          category={category}
          subcategory={subcategory}
          query={searchQuery}
        />

        <div>
          {searchQuery && (
            <button
              type="button"
              className={s.filterContent}
              onClick={handleClearSearchQueryClick}
            >
              <Text textClass="searchQueryContent" text={searchQuery} />
              <MdClose size={isMobile ? 18 : 22} />
            </button>
          )}
          {hasUrlSearchParams && (
            <button
              type="button"
              className={s.filterContent}
              onClick={handleClearFiltersClick}
            >
              <Text textClass="searchQueryContent" text="Скинути фільтри" />
              <MdClose size={isMobile ? 18 : 22} />
            </button>
          )}
        </div>
        <div style={{ position: 'relative' }}>
          {isUserLogin && (
            <button
              type="button"
              className={
                isSubscribedSearch()
                  ? `${s.btnDarkSubscribe}`
                  : `${s.btnLightSubscribe}`
              }
              onClick={handleSubscribtionClick}
            >
              <Text
                textClass="searchQueryContent"
                text={isSubscribedSearch() ? 'Ви підписані' : 'Підписатися'}
              />
              {isSubscribedSearch() ? (
                <HiStar size={isMobile ? 18 : 22} />
              ) : (
                <HiOutlineStar size={isMobile ? 18 : 22} />
              )}
            </button>
          )}
          {productsToRender.length > 0 && (
            <>
              <div className={getClassName()}>
                <div className={s.topBtnBox}>
                  {/* {isUserLogin && (
                  <button
                    type="button"
                    className={
                      isSubscribedSearch()
                        ? `${s.btnDarkSubscribe}`
                        : `${s.btnLightSubscribe}`
                    }
                    onClick={handleSubscribtionClick}
                  >
                    <Text
                      textClass="searchQueryContent"
                      text={
                        isSubscribedSearch() ? 'Ви підписані' : 'Підписатися'
                      }
                    />
                    {isSubscribedSearch() ? (
                      <HiStar size={isMobile ? 18 : 22} />
                    ) : (
                      <HiOutlineStar size={isMobile ? 18 : 22} />
                    )}
                  </button>
                )} */}
                  {isMobile && (
                    <button
                      type="button"
                      className={s.btnLightSubscribe}
                      onClick={handleShowFilterClick}
                    >
                      <Text textClass="searchQueryContent" text="Фільтри" />
                      <BsFilter size={18} />
                    </button>
                  )}
                </div>
                <Controller
                  control={control}
                  name="filterSection"
                  render={({ field: { value } }) => (
                    <SelectField
                      value={value}
                      className={'filterSection'}
                      handleChange={value => handleChangeFilter(value.value)}
                      options={options}
                      defaultValue={
                        filterSelected === ''
                          ? { value: 'популярні', label: 'Популярні' }
                          : {
                              value: filterSelected,
                              label:
                                filterSelected[0].toUpperCase() +
                                filterSelected.slice(1),
                            }
                      }
                      name="filterSection"
                    />
                  )}
                />
              </div>

              <ul className={s.listCard}>
                {productsToRender.map(
                  ({
                    _id,
                    mainPhotoUrl,
                    price,
                    nameProduct,
                    description,
                    section,
                    category,
                    size,
                  }) => (
                    <ProductItem
                      key={_id}
                      _id={_id}
                      mainPhotoUrl={mainPhotoUrl}
                      section={section}
                      category={category}
                      description={description}
                      price={price}
                      nameProduct={nameProduct}
                      size={size}
                    />
                  )
                )}
              </ul>
              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          )}
        </div>
        {!isLoading &&
          productsToRender.length === 0 &&
          products.length === 0 &&
          !hasHeaderFormErrors && (
            <NotFound
              textContent={'No products were found matching your request.'}
              classComp={'booWrapper-products'}
            />
          )}
        {isFilterFormSubmitted &&
          !isLoading &&
          productsToRender.length === 0 &&
          products.length === 0 && (
            <NotFound
              textContent={'No products were found matching your request.'}
              classComp={'booWrapper-products'}
            />
          )}
      </div>
      {isMessage && (
        <MessageWindow text={`${message}`} onDismiss={resetMessage} />
      )}
    </section>
  );
};

export default Products;
