import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  BsTrash,
  BsPencil,
  BsChatSquareText,
  BsChevronUp,
} from 'react-icons/bs';
import {
  getUserProducts,
  deleteProduct,
} from 'redux/product/product-operations';
import {
  getMyProducts,
  getMyProductsPages,
} from 'redux/product/product-selectors';
import { clearUserProducts } from 'redux/product/product-slice';
import { getMessage } from 'redux/product/product-selectors';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import PhotoCollection from 'components/Shared/PhotoCollection/PhotoCollection';
import UserUpdateComponent from 'components/Shared/helper/UserUpdateComponent';

import s from './MyWares.module.scss';

const MyWares = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [productId, setProductId] = useState(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [questionWindow, setQuestionWindow] = useState(false);

  const myProducts = useSelector(getMyProducts);
  const isMessage = useSelector(getMessage);
  const myProductsTotalPages = useSelector(getMyProductsPages);

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
    if (isMessage) {
      dispatch(clearUserProducts());
      setCurrentPage(1);
      dispatch(getUserProducts(currentPage));
    }
  }, [dispatch, currentPage, isMessage]);

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

  const handleButtonTrashClick = id => {
    setProductId(id);
    setQuestionWindow(true);
  };

  const handleClick = id => {};

  const handleConfirm = choice => {
    if (choice === 'yes') {
      dispatch(deleteProduct(productId));
      setQuestionWindow(false);
      dispatch(clearUserProducts());
      setCurrentPage(1);
    } else if (choice === 'no') {
      setProductId(null);
      setQuestionWindow(false);
    }
  };

  return (
    <div>
      <section className={s.myWaresWrapper}>
        {isMessage === '' && <UserUpdateComponent />}
        <ul className={s.waresList}>
          {myProducts.map(
            ({
              _id,
              mainPhotoUrl,
              additionalPhotoUrl,
              nameProduct,
              description,
              price,
            }) => (
              <li className={s.wareItem} key={_id}>
                <PhotoCollection
                  mainPhotoUrl={mainPhotoUrl}
                  additionalPhotoUrl={additionalPhotoUrl}
                  nameProduct={nameProduct}
                />
                <div className={s.box}>
                  <div className={s.descriptionWrapper}>
                    <Text textClass="verifyAttention" text={nameProduct} />
                    <div className={s.descriptionThumb}>{description}</div>
                    <Text textClass="verifyAttention" text={`${price}грн.`} />
                  </div>
                  <div className={s.buttonWrapper}>
                    <RoundButton icon={BsChatSquareText} />
                    <Link to={`/edit-product/${_id}`}>
                      <RoundButton
                        icon={BsPencil}
                        handleClick={handleClick}
                        id={_id}
                      />
                    </Link>
                    <RoundButton
                      icon={BsTrash}
                      handleClick={handleButtonTrashClick}
                      id={_id}
                    />
                  </div>
                </div>
              </li>
            )
          )}
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
            btnClass="scrollButton"
            icon={BsChevronUp}
            handleClick={scrollToTop}
          />
        )}
        {questionWindow && (
          <MessageWindow
            text="Ви впевнені, що хочете видалити оголошення?"
            confirmButtons={true}
            onConfirm={handleConfirm}
          />
        )}
        {isMessage && <MessageWindow text={isMessage} />}
      </section>
    </div>
  );
};

export default MyWares;
