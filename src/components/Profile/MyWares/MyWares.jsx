import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsTrash, BsPencil, BsChatSquareText, BsChevronUp  } from "react-icons/bs";
import { getUserProducts } from 'redux/product/product-operations';
import {
  getMyProducts,
  // getMyProductsTotal,
  getMyProductsPages,
} from 'redux/product/product-selectors';
import { clearUserProducts } from 'redux/product/product-slice';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import PhotoCollection from 'components/Shared/PhotoCollection/PhotoCollection';
import s from './MyWares.module.scss';

const MyWares = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
   // console.log('currentPage', currentPage);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const myProducts = useSelector(getMyProducts);
  // console.log('myProducts:', myProducts);
  const myProductsTotalPages = useSelector(getMyProductsPages);
  // console.log('myProductsTotalPages:', myProductsTotalPages);
  // const myProductsTotal = useSelector(getMyProductsTotal);
  // console.log('myProductsTotal:', myProductsTotal);
  

  const handleLoadMore = async () => {
    setCurrentPage(currentPage + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    dispatch(clearUserProducts());
    setCurrentPage(1);
  }, [dispatch]);

  useEffect(() => {
    dispatch(getUserProducts(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;
      if (currentPosition > 500) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  

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
                  <RoundButton icon={BsChatSquareText} />
                  <RoundButton icon={BsPencil} />
                  <RoundButton icon={BsTrash} />
                </div>
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
        {showScrollButton && (
          <RoundButton
            btnClass='scrollButton'
            icon={BsChevronUp}
          handleClick={scrollToTop}/>
        )}
      </section>
    </div>
  );
};

export default MyWares;
