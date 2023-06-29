import { useEffect, useState } from 'react';
import { NavLink, useSearchParams, useParams } from 'react-router-dom';
import { MdClose } from 'react-icons/md';

import { useSelector, useDispatch } from 'react-redux';
import { getProductsByQuery } from 'redux/product/product-selectors';
import { searchProducts } from 'redux/product/product-operations';

import TopNavProducts from 'components/Shared/TopNavProducts/TopNavProducts';
import ProductItem from 'components/Shared/ProductItem/ProductItem';
import Text from 'components/Shared/Text/Text';
import categoryOptions from 'components/AddProduct/category.json';
import { getPath } from '../../funcs&hooks/getPath.js';
import { getDeclension } from '../../funcs&hooks/getDeclansion.js';

import s from './Products.module.scss';

const Products = () => {
  const [query, setQuery] = useState('');
  const { category, subcategory } = useParams();
  const products = useSelector(getProductsByQuery);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setQuery(searchQuery);
    dispatch(searchProducts(searchQuery));
  }, [searchQuery, dispatch]);

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
  const handleReload = () => {
    window.sessionStorage.clear();
    searchParams.delete('search');
    setSearchParams(searchParams);
    window.location.reload();
  };

  let categoryName = '';
  switch (category) {
    case 'women':
      categoryName = 'Жінкам';
      break;
    case 'men':
      categoryName = 'Чоловікам';
      break;
    case 'children':
      categoryName = 'Дитячі товари';
      break;
    case 'beauty&health':
      categoryName = "Краса та здоров'я";
      break;
    default:
      categoryName = category;
      break;
  }
  const categoryIndex = Object.keys(categoryOptions).indexOf(categoryName);

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
                    <span className={s.amountBox}>{getDeclension(11)}</span>
                  </NavLink>
                </li>
              );
            })}
          </ul>
        )}
        {category && !subcategory && (
          <ul className={s.linkBox}>
            {Object.entries(categoryOptions)[categoryIndex][1].map(
              (el, index) => {
                return (
                  <li key={index}>
                    {/* <NavLink
                      className={({ isActive }) =>
                        `${isActive ? s.active : s.link}`
                      }
                      to={getPath(query, categoryName, el, true)}
                    >
                      {el} -{' '}
                      <span className={s.amountBox}>{getDeclension(11)}</span>
                    </NavLink> */}
                  </li>
                );
              }
            )}
          </ul>
        )}
        {searchQuery && (
          <div style={{ marginBottom: '15px' }}>
            <button
              type="button"
              className={s.searchContent}
              onClick={handleReload}
            >
              <Text textClass="searchQueryContent" text={searchQuery} />
              <MdClose size={22} />
            </button>
            <button type="button" className={s.searchContent}>
              <Text textClass="searchQueryContent" text="Скинути фільтри" />
              <MdClose size={22} />
            </button>
          </div>
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
