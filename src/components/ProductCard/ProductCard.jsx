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
import { getID, getLogin, selectUserBasket } from 'redux/auth/auth-selectors';

import SellerInfo from './SellerInfo/SellerInfo';
import Dialogue from 'components/Dialogue/Dialogue';

import Container from 'components/Shared/Container/Container';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
// import ProductSizes from 'components/ProductCard/ProductSizes';
import SizeSelection from 'components/Basket/SizeSelection/SizeSelection';
import ProductInfo from './ProductInfo';
import PhotoCollection from 'components/Shared/PhotoCollection/PhotoCollection';
import Loader from 'components/Loader/Loader';
import { translateParamsToUA } from '../../funcs&hooks/translateParamsToUA.js';
// import { BsSuitHeart } from 'react-icons/bs';
import { FiHeart } from 'react-icons/fi';
import { BiMessageDetail } from 'react-icons/bi';

import s from './ProductCard.module.scss';

const ProductCard = () => {
  const { category, subcategory, id } = useParams();
  const translatedParamsObj = translateParamsToUA(category, subcategory);
  const [categoryName, subCategoryName] = Object.values(translatedParamsObj);

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector(selectProductById);
  const userId = useSelector(getID);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    dispatch(clearOtherUser());
    dispatch(clearProductById());
    dispatch(getProductById(id)).then(() => setIsDataLoaded(true));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsLiked(false);
  }, [dispatch, id, isLiked]);

  const isLogin = useSelector(getLogin);
  const isLoading = useSelector(getLoadingProducts);

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

  
  // const sizeValuesArray = size ? size.map(item => item[0].value) : [];

  const userProductBasket = useSelector(selectUserBasket);

  const isProductInLike = userLikes && userLikes.includes(userId);
  const isProductInBasket = userProductBasket
    ? userProductBasket.find(item => item === id)
    : [];

  const setProductToBasket = () => {
    if (!isLogin) {
      navigate('/login');
      return;
    }
    dispatch(
      updateUserBasket({
        productId: id,
        selectedSizes: selectedSizes,
      })
    );
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

  const chattingRef = useRef();

  const scrollToChating = () => {
    chattingRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectedSizesChange = useCallback(sizes => {
    const transformedSizes = sizes.map(sizeGroup => {
      const sizeName = sizeGroup[0].value[0].EU;
      return [{ name: sizeName, value: sizeGroup[0].value }];
    });
    setSelectedSizes(transformedSizes);
  }, []);

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
                    {/* <ProductSizes
                      sizeValuesArray={sizeValuesArray}
                      text="Розміри:"
                    /> */}
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
                      <div className={s.additionalOpts}>
                        <BiMessageDetail className={s.favoriteIcon} />
                        <button onClick={scrollToChating}>
                          <Text
                            text="Поставити запитання"
                            textClass="productText"
                          />
                        </button>
                      </div>
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
            <Dialogue />
          </>
        )}
      </Container>
    </section>
  );
};

export default ProductCard;
