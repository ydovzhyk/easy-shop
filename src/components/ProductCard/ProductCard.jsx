import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  getLoadingProducts,
  selectProductById,
} from 'redux/product/product-selectors';
import { getProductById } from 'redux/product/product-operations';
import { clearOtherUser } from 'redux/otherUser/otherUser.slice';
import { clearProductById } from 'redux/product/product-slice';
import { updateUserBasket, updateUserLikes } from 'redux/auth/auth-opetations';
import {
  getID,
  getLogin,
  selectUserBasket,
  getUser,
} from 'redux/auth/auth-selectors';

import SellerInfo from './SellerInfo/SellerInfo';
import Dialogue from 'components/Dialogue/Dialogue';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import Container from 'components/Shared/Container/Container';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import SizeSelection from 'components/Shared/Sizes/SizeSelection/SizeSelection';
import ProductInfo from './ProductInfo';
import PhotoCollection from 'components/Shared/PhotoCollection/PhotoCollection';
import Loader from 'components/Loader/Loader';
import { translateParamsToUA } from '../../funcs&hooks/translateParamsToUA.js';
import { FiHeart } from 'react-icons/fi';
import { BiMessageDetail } from 'react-icons/bi';

import s from './ProductCard.module.scss';

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { category, subcategory, id } = useParams();
  const translatedParamsObj = translateParamsToUA(category, subcategory);
  const [categoryName, subCategoryName] = Object.values(translatedParamsObj);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isMessage, setIsMessage] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const isLogin = useSelector(getLogin);
  const isLoading = useSelector(getLoadingProducts);

  const product = useSelector(selectProductById);
  const userId = useSelector(getID);
  const user = useSelector(getUser);
  const userProductBasket = useSelector(selectUserBasket);
  const chattingRef = useRef();
  const userProducts = user.userProducts ? user.userProducts : [];
  const userDialogue = null;

  const {
    nameProduct,
    mainPhotoUrl,
    additionalPhotoUrl,
    price,
    owner,
    userLikes,
    size,
    vip,
    _id,
  } = product;

  console.log(
    'userProductBasket:',
    userProductBasket.flatMap(arr => arr)
  );
  // const transformedSizes = size.map((item) => {
  //   return {
  //     "0": {
  //       ...item["0"],
  //       quantity: 1,
  //     },
  //   };
  // });

  // console.log('transformedSizes', transformedSizes);
  console.log('size:', size);
  const modifiedSize =
    size &&
    size.map(sizeGroup => {
      const modifiedSizeGroup = sizeGroup.map(sizeObject => {
        return {
          ...sizeObject,
          quantity: 1,
        };
      });
      return modifiedSizeGroup;
    });

  const isProductInLike = userLikes && userLikes.includes(userId);
  const isProductInBasket = userProductBasket
    ? userProductBasket
        .flatMap(arr => arr)
        .find(product => product.productId === id)
    : [];

  const resetMessage = () => {
    setIsMessage(false);
  };

  const setProductToBasket = event => {
    if (!isLogin) {
      navigate('/login');
      return;
    }

    if (size && size.length === 1) {
      dispatch(
        updateUserBasket({
          productId: id,
          selectedSizes: modifiedSize,
        })
      );
    } else if (size && size.length > 1) {
      if (selectedSizes.length === 0 && !isProductInBasket) {
        setIsMessage(true);
        event.preventDefault();
        return;
      }

      dispatch(
        updateUserBasket({
          productId: id,
          selectedSizes: selectedSizes,
        })
      );
    }
  };

  // for likes
  const handleClick = async () => {
    if (!isLogin) {
      navigate('/login');
      return;
    }
    await dispatch(updateUserLikes({ productId: _id }));
    setIsLiked(true);
  };

  const scrollToChating = () => {
    chattingRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectedSizesChange = useCallback(sizes => {
    const transformedSizes = sizes.map(sizeGroup => {
      const sizeName = sizeGroup[0].value[0].EU;
      if (sizeName) {
        return [{ name: sizeName, quantity: 1, value: sizeGroup[0].value }];
      }
      if (!sizeName && Object.keys(sizeGroup[0].value[0])[0] === 'One size') {
        const key = Object.keys(sizeGroup[0].value[0])[0];
        return [{ name: key, quantity: 1, value: sizeGroup[0].value }];
      }
      if (!sizeName && Object.keys(sizeGroup[0].value[0])[0] === 'Інший') {
        const key = Object.keys(sizeGroup[0].value[0])[0];
        return [{ name: key, quantity: 1, value: sizeGroup[0].value }];
      }
      return [];
    });
    setSelectedSizes(transformedSizes);
  }, []);

  useEffect(() => {
    dispatch(clearOtherUser());
    dispatch(clearProductById());
    dispatch(getProductById(id)).then(() => setIsDataLoaded(true));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLiked(false);
  }, [dispatch, id, isLiked]);

  // Для відмалювання діалога якщо цей продукт не є власним
  const isUserProduct = userProducts.find(id => id === _id);

  const handleButtonClick = () => {
    navigate('/message');
  };

  return (
    <section className={s.productCard}>
      <Container>
        <p className={s.navigation}>
          <Link to={`/`}>Easy shop </Link> &#8250;
          <Link to={`/products/${category}`}> {categoryName} </Link>&#8250;
          <Link to={`/products/${category}/${subcategory}`}>
            {' '}
            {subCategoryName}
          </Link>
        </p>
        {isLoading && !isDataLoaded ? (
          <Loader />
        ) : (
          <>
            <div className={s.productCardWrapper}>
              <div>
                <div className={s.productMainInfo}>
                  <div className={s.fotoContainer}>
                    {vip === 'Так' && (
                      <div className={s.vipLabel}>
                        <span>Vip</span>
                      </div>
                    )}

                    <PhotoCollection
                      mainPhotoUrl={mainPhotoUrl}
                      nameProduct={nameProduct}
                      additionalPhotoUrl={
                        additionalPhotoUrl ? additionalPhotoUrl : []
                      }
                    />
                  </div>
                  <div className={s.productInfoWrapper}>
                    <p className={s.availability}>В наявності</p>
                    <Text text={nameProduct} textClass="productName" />
                    <div className={s.productPrice}>
                      <span className={s.productOldPrice}>379 грн</span>
                      <span className={s.productPriceDiscount}>-8%</span>
                      <Text text={price} textClass="title" />
                    </div>
                    <SizeSelection
                      sizeOption={size}
                      onSelectedSizesChange={handleSelectedSizesChange}
                    />
                    <div className={s.buyBtns}>
                      <NavLink to={isLogin ? '/checkout' : '/login'}>
                        <Button
                          type="button"
                          btnClass="btnLight"
                          text="Купити зараз"
                          handleClick={setProductToBasket}
                        />
                      </NavLink>

                      <Button
                        type="button"
                        btnClass={!isProductInBasket ? 'btnLight' : 'btnDark'}
                        text={
                          isProductInBasket
                            ? 'Товар у кошику'
                            : 'Додати до кошика'
                        }
                        handleClick={setProductToBasket}
                      />
                    </div>
                    <div className={s.additionalOptsContainer}>
                      <div className={s.additionalOpts} onClick={handleClick}>
                        {/* <BsSuitHeart className={s.favoriteIcon} /> */}

                        <FiHeart
                          className={`${isProductInLike ? s.active : s.liked}`}
                        />
                        <Text
                          text={
                            isProductInLike
                              ? 'Товар обраний'
                              : 'Додати в обрані'
                          }
                          textClass="productText"
                        />
                      </div>
                      {!isUserProduct && (
                        <div className={s.additionalOpts}>
                          <BiMessageDetail className={s.favoriteIcon} />
                          <button onClick={scrollToChating}>
                            <Text
                              text="Поставити запитання"
                              textClass="productText"
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <ProductInfo product={product} />
              </div>
              <div ref={chattingRef}>
                <Text text="Продавець:" textClass="productLabels" />
                <div className={s.sellerInfo}>
                  {isDataLoaded && owner && <SellerInfo owner={owner} />}
                </div>
              </div>
            </div>
            <div className={s.dialogueBox}>
              {!isUserProduct && (
                <Dialogue productInfo={{ _id, owner, userDialogue }} />
              )}
              {isUserProduct && (
                <div className={s.messageWarningBox}>
                  <div className={s.messageWarningText}>
                    <Text
                      text="Якщо ви хочете знати, чи хтось зацікавлений у цьому продукті, перейдіть до ваших повідомлень"
                      textClass="productLabels"
                    />
                  </div>
                  <Button
                    text="До повідомлень"
                    btnClass="btnLight"
                    handleClick={handleButtonClick}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </Container>
      {isMessage && (
        <MessageWindow text={'Оберіть розмір'} onDismiss={resetMessage} />
      )}
    </section>
  );
};

export default ProductCard;
