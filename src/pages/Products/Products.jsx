import { useEffect, useState } from 'react';
import { NavLink, useSearchParams, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { getProductsByQuery } from 'redux/product/product-selectors';
import { searchProducts } from 'redux/product/product-operations';

import TopNavProducts from 'components/Shared/TopNavProducts/TopNavProducts';
import ProductItem from 'components/Shared/ProductItem/ProductItem';
import categoryOptions from 'components/AddProduct/category.json';
import { getPath } from '../../funcs&hooks/getPath.js';

import s from './Products.module.scss';

const Products = () => {
  const [query, setQuery] = useState('');
  const { category, subcategory } = useParams();
  const products = useSelector(getProductsByQuery);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setQuery(searchQuery);
    dispatch(searchProducts(searchQuery));
  }, [searchQuery, dispatch]);

  const getDeclension = amount => {
    if (
      amount === 1 &&
      amount % 10 === 1 &&
      !amount.toString().endsWith('11')
    ) {
      return `${amount.toString()} ${'річ'}`;
    }
    if (
      amount.toString().endsWith('2' || '3' || '4') &&
      !amount.toString().endsWith('12' || '13' || '14')
    ) {
      return `${amount.toString()} ${'речі'}`;
    }
    return `${amount.toString()} ${'речей'}`;
  };

  // useEffect(() => {
  //   if (!category) {
  //     return;
  //   }
  // }, [category]);

  // useEffect(() => {
  //   if (!subcategory) {
  //     return;
  //   }
  // }, [subcategory]);

  return (
    <section style={{ flexGrow: 1 }}>
      <div className={s.container}>
        <TopNavProducts category={category} subcategory={subcategory} />
        {!category && (
          <ul className={s.linkBox}>
            {Object.keys(categoryOptions).map((el, index) => {
              return (
                <li key={index}>
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? s.active : s.link}`
                    }
                    to={getPath(query, el, true)}
                  >
                    {el} -{' '}
                    <span className={s.container}>{getDeclension(11)}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}

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
