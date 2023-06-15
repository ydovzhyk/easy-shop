import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProducts } from 'redux/product/product-operations';
import {
  getMyProducts,
  getMyProductsTotal,
  getMyProductsPages,
} from 'redux/product/product-selectors';
import { clearUserProducts } from 'redux/product/product-slice';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import PhotoCollection from 'components/Shared/PhotoCollection/PhotoCollection';
import s from './MyWares.module.scss';

const MyWares = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const myProducts = useSelector(getMyProducts);
  console.log('myProducts:', myProducts);
  const myProductsTotalPages = useSelector(getMyProductsPages);

  useEffect(() => {
    dispatch(clearUserProducts());
    setCurrentPage(1);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserProducts(currentPage));
  }, [dispatch, currentPage]);
  console.log('myProductsTotalPages:', myProductsTotalPages);
  const myProductsTotal = useSelector(getMyProductsTotal);
  console.log('myProductsTotal:', myProductsTotal);
  
  console.log('currentPage', currentPage);

  const handleLoadMore = async () => {
    setCurrentPage(currentPage + 1);
  };

  console.log(myProducts);
  return (
    <div>
      <section className={s.myWaresWrapper}>
        <ul className={s.waresList}>
          {myProducts.map(({ _id, mainPhotoUrl, additionalPhotoUrl, nameProduct, description, price }) => (
            <li className={s.wareItem} key={_id}>
              <PhotoCollection
                mainPhotoUrl={mainPhotoUrl}
                additionalPhotoUrl={additionalPhotoUrl}
                nameProduct={nameProduct}
              />
              <div className={s.box}>
                <div className={s.descriptionWrapper}>
                  <Text textClass="verifyAttention" text={nameProduct} />
                  <div className={s.descriptionThumb}>{ description}</div>
                  <Text textClass="verifyAttention" text={`${price}грн.`} />
                </div>
                <div className={s.buttonWrapper}>
                  <Button btnClass="myWareButton" text="Відгуки" />
                  <Button btnClass="myWareButton" text="Змінити" />
                  <Button btnClass="myWareButton" text="Видалити" />
                </div>
              </div>
              
            </li>
          ))}
        </ul>
        {currentPage < myProductsTotalPages && (
          <>
            <Button
            btnClass="btnLight"
            text="Завантажити ще"
            handleClick={handleLoadMore}
            />
            <Button btnClass="btnLight" text="На початок"/>
          </>
        )}
      </section>
    </div>
  );
};

export default MyWares;
