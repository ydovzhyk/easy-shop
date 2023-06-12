import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserProducts } from 'redux/product/product-operations';
import {
  // getProducts,
  getMyProducts,
} from 'redux/product/product-selectors';
import Container from 'components/Shared/Container';
import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import s from './MyWares.module.scss';

const MyWares = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProducts());
  }, [dispatch]);

  const myProducts = useSelector(getMyProducts);
  console.log(myProducts);

  return (
    <Container>
      <section className={s.myWaresWrapper}>
        <ul className={s.waresList}>
          {myProducts.map(({ _id, mainPhotoUrl, nameProduct, price }) => (
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
      </section>
    </Container>
  );
};

export default MyWares;
