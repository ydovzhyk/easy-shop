import { useState, useMemo } from 'react';
import { useSearchParams, useParams, useLocation } from 'react-router-dom';
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
import { useEffect } from 'react';

const Products = () => {
  const [filterSelected, setFilterSelected] = useState('');
  // const [productsArray, setProductsArray] = useState('');
  const [sortedProducts, setSortedProducts] = useState([]);
  // const [pathState, setPathState] = useState('');
  // const [pathSearch, setPathSearch] = useState('');

  const { category, subcategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  // const { pathname } = useLocation();

  const products = useSelector(getProductsByQuery);
  const isFilterFormSubmitted = useSelector(getFilterForm);
  const dispatch = useDispatch();

  const { control } = useForm();

  // useEffect(() => {
  //   if (
  //     products.length === 0 &&
  //     sortedProducts.length === 0 &&
  //     filterSelected === ''
  //   ) {
  //     console.log('123');
  //     return;
  //   }
  // }, [filterSelected, products.length, sortedProducts.length]);
  const handleChangeFilter = async filterSelected => {
    await setFilterSelected(filterSelected);

    switch (filterSelected) {
      case 'Від найдешевших':
        await setSortedProducts(
          products.slice(0).sort((a, b) => a.price - b.price)
        );
        break;
      case 'Від найдорожчих':
        await setSortedProducts(
          products.slice(0).sort((a, b) => b.price - a.price)
        );
        break;
      case 'За датою':
        await setSortedProducts(
          products.slice(0).sort((a, b) => -a.date.localeCompare(b.date))
        );
        break;
      case '':
        await setSortedProducts(products);
        break;
      default:
        await setSortedProducts(products);
        break;
    }
  };

  const productsToRender = useMemo(() => {
    return sortedProducts.length > 1 &&
      sortedProducts.length === products.length
      ? sortedProducts
      : products;
  }, [sortedProducts, products]);
  console.log(products);
  console.log(productsToRender);

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
            render={({ field: { onChange, value } }) => (
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

        {/* {products.length > 0 && ( */}
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
        {/* )} */}
        {products.length < 1 && <h1>За вашим запитом товарів не знайдено</h1>}
      </div>
    </section>
  );
};

export default Products;
