import { useState, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

import { useForm, Controller } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import {
  getLoadingProducts,
  getProductsByQuery,
  getFilterForm,
  getCurrentProductsPage,
  getHeaderFormErrors,
} from 'redux/product/product-selectors';
import {
  resetHeaderForm,
  setCurrentProductsPage,
  resetFilterProduct,
} from 'redux/product/product-slice';

import Pagination from 'components/Shared/Pagination/Pagination';
import TopNavProducts from 'components/Shared/TopNavProducts/TopNavProducts';
import ProductItem from 'components/Shared/ProductItem/ProductItem';
import Text from 'components/Shared/Text/Text';
import NotFound from 'components/NotFound/NotFound';
import SelectField from 'components/Shared/SelectField/SelectField';

import s from './Products.module.scss';
import { useEffect } from 'react';

const Products = () => {
  const [filterSelected, setFilterSelected] = useState('');
  const currentPage = useSelector(getCurrentProductsPage);
  const hasHeaderFormErrors = useSelector(getHeaderFormErrors);

  const { category, subcategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const products = useSelector(getProductsByQuery);
  const isFilterFormSubmitted = useSelector(getFilterForm);
  const isLoading = useSelector(getLoadingProducts);
  const dispatch = useDispatch();

  const { control } = useForm();

  const handleChangeFilter = async filterSelected => {
    await setFilterSelected(filterSelected);
  };

  const productsToRender = useMemo(() => {
    let productsState = [...products];

    switch (filterSelected) {
      case 'Від найдешевших':
        return productsState.slice(0).sort((a, b) => a.price - b.price);

      case 'Від найдорожчих':
        return productsState.slice(0).sort((a, b) => b.price - a.price);

      case 'За датою':
        return productsState
          .slice(0)
          .sort((a, b) => -a.date.localeCompare(b.date));

      default:
        return productsState;
    }
  }, [products, filterSelected]);

  const searchQuery =
    JSON.parse(window.sessionStorage.getItem('searchQuery')) ?? '';

  const handleClearSearchQueryClick = async () => {
    await searchParams.delete('search');
    await setSearchParams(searchParams);
    await dispatch(resetHeaderForm());
    await dispatch(setCurrentProductsPage(1));
  };

  const handleClearFiltersClick = async () => {
    await dispatch(resetFilterProduct());
    await dispatch(setCurrentProductsPage(1));
  };

  const handlePageChange = page => {
    dispatch(setCurrentProductsPage(page));
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section style={{ flexGrow: 1, position: 'relative' }}>
      <div className={s.container}>
        <TopNavProducts
          products={products}
          category={category}
          subcategory={subcategory}
          query={searchQuery}
        />

        <div>
          {searchQuery && (
            <button
              type="button"
              className={s.searchContent}
              onClick={handleClearSearchQueryClick}
            >
              <Text textClass="searchQueryContent" text={searchQuery} />
              <MdClose size={22} />
            </button>
          )}
          {isFilterFormSubmitted && (
            <button
              type="button"
              className={s.searchContent}
              onClick={handleClearFiltersClick}
            >
              <Text textClass="searchQueryContent" text="Скинути фільтри" />
              <MdClose size={22} />
            </button>
          )}
        </div>
        {productsToRender.length > 0 && (
          <>
            <div style={{ textAlign: 'right' }}>
              <Controller
                control={control}
                name="filterSection"
                render={({ field: { value } }) => (
                  <SelectField
                    value={value}
                    className={'filterSection'}
                    handleChange={value => handleChangeFilter(value.value)}
                    options={[
                      'Популярні',
                      'Від найдешевших',
                      'Від найдорожчих',
                      'За датою',
                    ]}
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
            <Pagination
              totalPages={4}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </>
        )}

        {!isLoading &&
          productsToRender.length === 0 &&
          products.length === 0 &&
          !hasHeaderFormErrors && (
            <NotFound
              textTop={'За вашим запитом'}
              textBottom={'товарів не знайдено.'}
              classComp={'booWrapper-products'}
            />
          )}
      </div>
    </section>
  );
};

export default Products;
