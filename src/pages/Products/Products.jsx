import { useState, useMemo } from 'react';
import { useSearchParams, useParams } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

import { useForm, Controller } from 'react-hook-form';

import { useSelector, useDispatch } from 'react-redux';
import { getProductsByQuery } from 'redux/product/product-selectors';
import { getFilterForm } from 'redux/product/product-selectors';
import { resetHeaderForm } from 'redux/product/product-slice';
import { resetFilterProduct } from 'redux/product/product-slice';

import TopNavProducts from 'components/Shared/TopNavProducts/TopNavProducts';
import ProductItem from 'components/Shared/ProductItem/ProductItem';
import Text from 'components/Shared/Text/Text';
import SelectField from 'components/Shared/SelectField/SelectField';

import s from './Products.module.scss';

const Products = () => {
  const [filterSelected, setFilterSelected] = useState('');

  const { category, subcategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const products = useSelector(getProductsByQuery);
  const isFilterFormSubmitted = useSelector(getFilterForm);
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
  };

  const handleClearFiltersClick = async () => {
    await dispatch(resetFilterProduct());
  };

  return (
    <section style={{ flexGrow: 1 }}>
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
                defaultValue={{ value: 'популярні', label: 'Популярні' }}
                name="filterSection"
              />
            )}
          />
        </div>

        {productsToRender.length > 0 && (
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
        )}

        {productsToRender.length === 0 && (
          <h1>За вашим запитом товарів не знайдено</h1>
        )}
      </div>
    </section>
  );
};

export default Products;
