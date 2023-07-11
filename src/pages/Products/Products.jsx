import { useSearchParams, useParams } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { getProductsByQuery } from 'redux/product/product-selectors';
import { getFilterForm } from 'redux/product/product-selectors';
import { resetHeaderForm } from 'redux/product/product-slice';
import { resetFilterProduct } from 'redux/product/product-slice';

import TopNavProducts from 'components/Shared/TopNavProducts/TopNavProducts';
import ProductItem from 'components/Shared/ProductItem/ProductItem';
import Text from 'components/Shared/Text/Text';

import s from './Products.module.scss';

const Products = () => {
  const { category, subcategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const products = useSelector(getProductsByQuery);
  const isFilterFormSubmited = useSelector(getFilterForm);
  const dispatch = useDispatch();

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

        <div style={{ marginBottom: '15px' }}>
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
          {isFilterFormSubmited && (
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

        {products.length > 0 && (
          <ul className={s.listCard}>
            {products.map(
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
        {products.length < 1 && <h1>За вашим запитом товарів не знайдено</h1>}
      </div>
    </section>
  );
};

export default Products;
