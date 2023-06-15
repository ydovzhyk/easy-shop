import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProducts } from 'redux/product/product-operations';
import {
  getMyProducts,
  getMyProductsTotal,
  getMyProductsPages,
} from 'redux/product/product-selectors';
import { clearUserProducts } from 'redux/product/product-slice';
import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
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
              <div className={s.partPhotoWrapper}>
                <img
                  className={s.photoCard}
                  src={mainPhotoUrl}
                  onError={e => (e.target.src = NoPhoto)}
                  alt={nameProduct}
                />
                <ul className={s.additionalPhotoWrapper}>
                  {additionalPhotoUrl.map((photo, index) => (
                    <li className={s.additionalPhoto} key={index}>
                      <img
                        className={s.additionalPhotoCard}
                        src={photo}
                        onError={e => (e.target.src = NoPhoto)}
                        alt={nameProduct}
                      />
                    </li>
                  ))}
                </ul>
              </div>
              <div className={s.partWrapper}>
                <Text textClass="after-title" text={nameProduct} />
                <Text textClass="after-title" text={`${price}грн.`} />
              </div>
              <div className={s.buttonWrapper}>
                <Button btnClass="myWareButton" text="Відгуки" />
                <Button btnClass="myWareButton" text="Змінити" />
                <Button btnClass="myWareButton" text="Видалити" />
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
