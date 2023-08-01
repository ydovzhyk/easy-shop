import { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  getLoadingProducts,
  selectProductById,
} from 'redux/product/product-selectors';
import { getProductById } from 'redux/product/product-operations';
import { clearOtherUser } from 'redux/otherUser/otherUser.slice';
import { clearProductById } from 'redux/product/product-slice';
import { updateUserBasket, updateUserLikes } from 'redux/auth/auth-opetations';
import { addOrder } from 'redux/order/order-operations';
import {
  getID,
  getLogin,
  selectUserBasket,
  getUser,
} from 'redux/auth/auth-selectors';
import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';

import SellerInfo from './SellerInfo/SellerInfo';
import Dialogue from 'components/Dialogue/Dialogue';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import Container from 'components/Shared/Container/Container';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import SizeSelection from 'components/Shared/Sizes/SizeSelection/SizeSelection';
import ProductDetails from './ProductDetails';
import Loader from 'components/Loader/Loader';
import { translateParamsToUA } from '../../funcs&hooks/translateParamsToUA.js';
import { FiHeart } from 'react-icons/fi';
import { BiMessageDetail } from 'react-icons/bi';

import s from './ProductCard.module.scss';
import ProductPhotoContainer from './ProductPhotoContainer';

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProductById);
  const userId = useSelector(getID);
  const userProductBasket = useSelector(selectUserBasket);
  const sellerInfo = useSelector(selectOtherUser);
  const chattingRef = useRef();
  const { category, subcategory, id } = useParams();
  const translatedParamsObj = translateParamsToUA(category, subcategory);
  const [categoryName, subCategoryName] = Object.values(translatedParamsObj);
  const user = useSelector(getUser);
  const userProducts = user.userProducts ? user.userProducts : [];
  const userDialogue = null;

  const { nameProduct, price, owner, userLikes, size, _id, sale } = product;

  const isProductInBasket = (userProductBasket || [])
    .flat()
    .find(product => product.productId === id);

  const selectedSizesById = isProductInBasket
    ? isProductInBasket.selectedSizes
    : [];

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const [selectedSizes, setSelectedSizes] = useState([]);
  const [isMessage, setIsMessage] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const isLogin = useSelector(getLogin);
  const isLoading = useSelector(getLoadingProducts);

  const transformedSizes =
    size &&
    size.map(([size]) => ({
      ...size,
      quantity: 1,
    }));

  const isProductInLike = userLikes && userLikes.includes(userId);

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
          selectedSizes: transformedSizes,
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
    const transformedSizes = sizes.flatMap(sizeGroup => {
      const sizeName = sizeGroup[0].value[0].EU;
      if (sizeName) {
        return { name: sizeName, quantity: 1, value: sizeGroup[0].value };
      }
      if (!sizeName && Object.keys(sizeGroup[0].value[0])[0] === 'One size') {
        const key = Object.keys(sizeGroup[0].value[0])[0];
        return { name: key, quantity: 1, value: sizeGroup[0].value };
      }
      if (!sizeName && Object.keys(sizeGroup[0].value[0])[0] === 'Інший') {
        const key = Object.keys(sizeGroup[0].value[0])[0];
        return { name: key, quantity: 1, value: sizeGroup[0].value };
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

  const isUserProduct = userProducts.find(id => id === _id);

  const handleButtonClick = () => {
    navigate('/message');
  };

  // for sale
  const discountedPrice = sale ? (price * (100 - sale)) / 100 : price;
  // for BuyNow
  const handleBuyNowButtonClick = async event => {
    // await setProductToBasket(event);
    if (!isLogin) {
      navigate('/login');
      return;
    }
    const selectedProductSizes =
      size.length === 1 ? transformedSizes : selectedSizes;
    
    if (selectedProductSizes.length === 0 && !isProductInBasket) {
      setIsMessage(true);
      event.preventDefault();
      return;
    }
    if (userProductBasket.length >= 1) {
      await dispatch(
        updateUserBasket({
          productId: id,
          selectedSizes: selectedProductSizes,
        })
      );
      // await setProductToBasket(event);
      navigate('/basket');
      return;
    }
    const dataForUpload = {
      ownerId: owner,
      ownerName: sellerInfo.username,
      products: [
        {
          _id: _id,
          quantity: selectedProductSizes.length,
          size: selectedProductSizes,
          price: discountedPrice,
          sum: selectedProductSizes.length * discountedPrice,
        },
      ],
      totalSum: selectedProductSizes.length * discountedPrice,
    };
    console.log('Відправка форми', dataForUpload);

    const newOrder = await dispatch(addOrder(dataForUpload));

    if (newOrder.payload.newOrderId) {
      await dispatch(updateUserBasket({ productId: _id }));
      navigate('/checkout', {
        state: { orderId: newOrder.payload.newOrderId },
      });
    }
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
                  <ProductPhotoContainer />
                  <div className={s.productInfoWrapper}>
                    <p className={s.availability}>В наявності</p>
                    <Text text={nameProduct} textClass="productName" />
                    {sale ? (
                      <>
                        <span className={s.productOldPrice}>{price}грн</span>
                        <span className={s.productPriceDiscount}>-{sale}%</span>
                        <Text
                          text={`${discountedPrice} грн`}
                          textClass="title"
                        />
                      </>
                    ) : (
                      <Text text={`${price} грн`} textClass="title" />
                    )}
                    {size && (
                      <SizeSelection
                        sizeOption={size}
                        defaultSelectedSizes={selectedSizesById}
                        onSelectedSizesChange={handleSelectedSizesChange}
                      />
                    )}
                    {!isUserProduct && (
                      <div className={s.buyBtns}>
                        <Button
                          type="button"
                          btnClass="btnLight"
                          text="Купити зараз"
                          handleClick={handleBuyNowButtonClick}
                        />

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
                    )}

                    <div className={s.additionalOptsContainer}>
                      {!isUserProduct && (
                        <div className={s.additionalOpts} onClick={handleClick}>
                          <FiHeart
                            className={`${
                              isProductInLike ? s.active : s.liked
                            }`}
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
                      )}

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
                <ProductDetails product={product} />
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
