import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProducts } from 'redux/product/product-operations';
import {
  getMyProductsPages,
  getMyProducts,
} from 'redux/product/product-selectors';

import Container from 'components/Shared/Container/Container';
import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import s from './MyWares.module.scss';

const MyWares = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const myProducts = useSelector(getMyProducts);
  const myProductsTotalPages = useSelector(getMyProductsPages);
  const [products, setProducts] = useState([]);
  console.log('currentPage', currentPage);

  useEffect(() => {
    console.log('відправляємо запрос');
    dispatch(getUserProducts(currentPage));
  }, [dispatch, currentPage]);

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    setProducts(prevProducts => [...prevProducts, ...myProducts]);
  }, [myProducts]);

  return (
    <Container>
      <section className={s.myWaresWrapper}>
        <ul className={s.waresList}>
          {products.map(({ _id, mainPhotoUrl, nameProduct, price }) => (
            <li className={s.wareItem} key={_id}>
              <div className={s.partWrapper}>
                <img
                  className={s.photoCard}
                  src={mainPhotoUrl}
                  onError={e => (e.target.src = NoPhoto)}
                  alt={nameProduct}
                />
              </div>
              <div className={s.partWrapper}>
                <Text textClass="titleGroupItems" text={nameProduct} />
                <Text textClass="after-title" text={`${price}грн.`} />
              </div>
              <div className={s.partWrapper}>
                <Button btnClass="btnLight" text="Відгуки" />
                <Button btnClass="btnLight" text="Змінити" />
                <Button btnClass="btnLight" text="Видалити" />
              </div>
            </li>
          ))}
        </ul>
        {currentPage < myProductsTotalPages && (
          <Button
            btnClass="btnLight"
            text="Завантажити ще"
            handleClick={handleLoadMore}
          />
        )}
      </section>
    </Container>
  );
};

export default MyWares;
