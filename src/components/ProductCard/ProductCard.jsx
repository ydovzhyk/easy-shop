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
import { getLogin, selectUserBasket, getUser } from 'redux/auth/auth-selectors';
import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';

import SellerInfo from './SellerInfo/SellerInfo';
import Dialogue from 'components/Dialogue/Dialogue';
import MessageWindow from 'components/Shared/MessageWindow/MessageWindow';
import Container from 'components/Shared/Container/Container';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import ProductDetails from './ProductDetails/ProductDetails';
import Loader from 'components/Loader/Loader';
import ProductPhotoContainer from './ProductPhotoContainer/ProductPhotoContainer';
import ProductInfo from './ProductInfo/ProductInfo';
import { translateParamsToUA } from '../../funcs&hooks/translateParamsToUA.js';

import s from './ProductCard.module.scss';

const ProductCard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const product = useSelector(selectProductById);
  const userProductBasket = useSelector(selectUserBasket);
  const sellerInfo = useSelector(selectOtherUser);
  const chattingRef = useRef();
  const { category, subcategory, id } = useParams();
  const translatedParamsObj = translateParamsToUA(category, subcategory);
  const [categoryName, subCategoryName] = Object.values(translatedParamsObj);
  const user = useSelector(getUser);
  const userProducts = user.userProducts ? user.userProducts : [];
  const userDialogue = null;

  const { price, owner, size, _id, sale } = product;

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
  const handleLikesClick = async () => {
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

  const handleMessageButtonClick = () => {
    navigate('/message');
  };

  // for sale
  const discountedPrice = sale ? (price * (100 - sale)) / 100 : price;
  // for BuyNow
  const handleBuyNowButtonClick = async event => {
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
                  <ProductInfo
                    product={product}
                    selectedSizesById={selectedSizesById}
                    handleSelectedSizesChange={handleSelectedSizesChange}
                    isUserProduct={isUserProduct}
                    handleBuyNowButtonClick={handleBuyNowButtonClick}
                    scrollToChating={scrollToChating}
                    setProductToBasket={setProductToBasket}
                    isProductInBasket={isProductInBasket}
                    handleLikesClick={handleLikesClick}
                  />
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
                    handleClick={handleMessageButtonClick}
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
