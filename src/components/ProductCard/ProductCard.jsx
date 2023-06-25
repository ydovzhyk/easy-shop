import { useParams, Link, NavLink } from 'react-router-dom';
import Container from 'components/Shared/Container/Container';
import s from './ProductCard.module.scss';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import { BsSuitHeart } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';
import SellerInfo from './SellerInfo/SellerInfo';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductById } from 'redux/product/product-selectors';
import { getProductById } from 'redux/product/product-operations';
import { useEffect, useRef } from 'react';
import Dialogue from 'components/Dialogue/Dialogue';
import PhotoCollection from 'components/Shared/PhotoCollection/PhotoCollection';
import { translateParamsToUA } from '../../funcs&hooks/translateParamsToUA.js';
import { nanoid } from '@reduxjs/toolkit';
import { getLogin } from 'redux/auth/auth-selectors';
import ProductSizes from './Productsizes';
import ProductInfo from './ProductInfo';


const ProductCard = () => {
  const { category, subcategory, id } = useParams();
  const translatedParamsObj = translateParamsToUA(category, subcategory);
  const [categoryName, subCategoryName] = Object.values(translatedParamsObj);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, id]);
  
  const product = useSelector(selectProductById);
  const isLogin = useSelector(getLogin);
  // console.log( id, product);

  const {
    nameProduct,
    mainPhotoUrl,
    additionalPhotoUrl,
    price,
    owner,
    size,
    vip,
  } = product;

  // console.log(product);

  const sizeValuesArray = size ? size.map(item => item[0].value) : [];
  const addProductToBasket = () => {
    console.log("add product to basket");
  }

  const chattingRef = useRef();

  const scrollToChating = () => {
    chattingRef.current.scrollIntoView({ behavior: 'smooth' });
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
          <div className={s.productCardWrapper}>
            <div>
              <div className={s.productMainInfo}>
                <div className={s.fotoContainer}>
                  {vip === 'Так' && (
                    <div className={s.vipLabel}>
                      <span>Vip</span>
                    </div>
                  )}

                  {product !== {} && (
                    <PhotoCollection
                      mainPhotoUrl={mainPhotoUrl}
                      nameProduct={nameProduct}
                      additionalPhotoUrl={
                        additionalPhotoUrl ? additionalPhotoUrl : []
                      }
                    />
                  )}
                </div>
                <div className={s.productInfoWrapper}>
                  <p className={s.availability}>В наявності</p>
                  <Text text={nameProduct} textClass="productName" />
                  <div className={s.productPrice}>
                    <span className={s.productOldPrice}>379 грн</span>
                    <span className={s.productPriceDiscount}>-8%</span>
                    <Text text={price} textClass="title" />
                  </div>
                  <ProductSizes sizeValuesArray={sizeValuesArray} />

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
                      text="Додати до кошика"
                      handleClick={addProductToBasket}
                    />
                  </div>
                  <div className={s.additionalOptsContainer}>
                    <div className={s.additionalOpts}>
                      <BsSuitHeart className={s.favoriteIcon} />
                      <Text text="Додати в обрані" textClass="productText" />
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
                <SellerInfo owner={owner} />
              </div>
            </div>
          </div>
          <Dialogue />
        </Container>
      </section>
    );
};

export default ProductCard;
