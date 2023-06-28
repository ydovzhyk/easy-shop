import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useSearchParams } from 'react-router-dom';
import { searchProducts } from 'redux/product/product-operations';
import { useSelector } from 'react-redux';
import { getProductsByQuery } from 'redux/product/product-selectors';
import { useParams } from 'react-router-dom';
import TopNavProducts from 'components/Shared/TopNavProducts/TopNavProducts';
import ProductItem from 'components/Shared/ProductItem/ProductItem';
import categoryOptions from 'components/AddProduct/category.json';
import s from './Products.module.scss';

const Products = () => {
  const { category, subcategory } = useParams();
  const products = useSelector(getProductsByQuery);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') ?? '';
  const dispatch = useDispatch();

  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
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
  const getPath = category => {
    let firstPartPath = '';
    switch (category) {
      case 'Жінкам':
        firstPartPath = 'women';
        break;
      case 'Чоловікам':
        firstPartPath = 'men';
        break;
      case 'Дитячі товари':
        firstPartPath = 'children';
        break;
      case "Краса та здоров'я":
        firstPartPath = 'beauty&health';
        break;
      default:
        break;
    }
    return `${firstPartPath}`;
  };
  return (
    <section style={{ flexGrow: 1 }}>
      <div className={s.container}>
        <TopNavProducts category={category} subcategory={subcategory} />
        {!category && (
          <ul>
            {Object.keys(categoryOptions).map((el, index) => {
              return (
                <li key={index}>
                  <NavLink
                    className={({ isActive }) =>
                      `${isActive ? s.active : s.link}`
                    }
                    to={getPath(el)}
                  >
                    {el}
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
