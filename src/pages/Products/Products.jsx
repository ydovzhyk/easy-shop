import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { searchProducts } from 'redux/product/product-operations';
import { useSelector } from 'react-redux';
import { getProductsByQuery } from 'redux/product/product-selectors';
import { useParams } from 'react-router-dom';
import { Link, NavLink } from 'react-router-dom';
import NoPhoto from '../../images/catalog_photo/no_photo.jpg';
import { FiHeart } from 'react-icons/fi';
import ProductItem from 'components/Shared/ProductItem/ProductItem';
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

  useEffect(() => {
    if (!category) {
      return;
    }
    console.log('category');
  }, [category]);

  useEffect(() => {
    if (!subcategory) {
      return;
    }
    console.log('subcategory');
  }, [subcategory]);

  return (
    <section className={s.container}>
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
            }) => (
              <ProductItem
                _id={_id}
                mainPhotoUrl={mainPhotoUrl}
                section={section}
                category={category}
                description={description}
                price={price}
                nameProduct={nameProduct}
              />
            )
          )}
        </ul>
      )}
      {products.length < 1 && <h1>За вашим запитом товарів не знайдено</h1>}
    </section>
  );
};

export default Products;
