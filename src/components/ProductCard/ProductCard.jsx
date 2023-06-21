import { useParams, Link } from 'react-router-dom';
import Container from 'components/Shared/Container/Container';
import s from './ProductCard.module.scss';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import { BsSuitHeart } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi'; //! moved below into component Dialogue and no longer needed

import SellerInfo from './SellerInfo/SellerInfo';
import DeliveryList from './DeliveryList';
import { useDispatch, useSelector } from 'react-redux';
import {  selectProductById } from 'redux/product/product-selectors';
import { getProductById } from 'redux/product/product-operations';
import { useEffect } from 'react';
import Dialogue from 'components/Dialogue/Dialogue';
import PhotoCollection from 'components/Shared/PhotoCollection/PhotoCollection';

const ProductCard = () => {
  const { category, subcategory, id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
  }, [dispatch, id]);

  const product = useSelector(selectProductById);
  // console.log( id, product);

  const {
    nameProduct,
    brendName,
    condition,
    description,
    mainPhotoUrl,
    additionalPhotoUrl,
    price,
    category: subSection,
    owner,
    size,
  } = product;

  const sizeValuesArray = size ? size.map(item => item[0].value) : [];

    return (
      <section className={s.productCard}>
        <Container>
          <p className={s.navigation}>
            <Link to={`/`}>Easy shop </Link> &#8250;
            <Link to={`/products/${category}`}> {category} </Link>&#8250;
            <Link to={`/products/${category}/${subcategory}`}>
              {' '}
              {subcategory}
            </Link>
          </p>
          <div className={s.productCardWrapper}>
            <div>
              <div className={s.productMainInfo}>
                <div className={s.fotoContainer}>
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
                  <Text text="Розміри:" textClass="productLabels" />

                  {sizeValuesArray.length > 1 ? (
                    sizeValuesArray.map(item => {
                      return (
                        <div className={s.size}>
                          <Text
                            text={`EU: ${item[0].EU} / UA: ${item[1].UA} / IN: ${item[2].IN} `}
                            textClass="after-title-bigger"
                          />
                        </div>
                      );
                    })
                  ) : (
                    <div className={s.size}>
                      <Text
                        text={` ${size.map(item => item[0].name)} `}
                        textClass="after-title-bigger"
                      />
                    </div>
                  )}

                  <div className={s.buyBtns}>
                    <Button
                      type="button"
                      btnClass="btnLight"
                      text="Купити зараз"
                    />
                    <Button type="button" text="Додати до кошика" />
                  </div>

                  <div className={s.additionalOptsContainer}>
                    <div className={s.additionalOpts}>
                      <BsSuitHeart className={s.favoriteIcon} />
                      <Text text="Додати в обрані" textClass="productText" />
                    </div>
                    <div className={s.additionalOpts}>
                      <BiMessageDetail className={s.favoriteIcon} />
                      <Text
                        text="Поставити запитання"
                        textClass="productText"
                      />
                    </div>
                  </div>
                  {/* //! moved below into component Dialogue and no longer needed */}
                  {/* <div className={s.additionalOpts}>
                    <BiMessageDetail className={s.favoriteIcon} />
                    <Text text="Поставити запитання" textClass="productText" />
                  </div> */}
                </div>
              </div>

              <ul className={s.productInfo}>
                <li className={s.productDescription}>
                  <Text text="Стан:" textClass="productLabels" />
                  <Text text={condition} textClass="productText" />
                </li>
                <li className={s.productDescription}>
                  <Text text="Бренд:" textClass="productLabels" />
                  <Text text={brendName} textClass="productText" />
                </li>
                <li className={s.productDescription}>
                  <Text text="Категорії:" textClass="productLabels" />
                  <Text text={subSection} textClass="productText" />
                </li>
              </ul>
              <div className={s.productDetails}>
                <div className={s.productDescription}>
                  <Text text="Опис товару:" textClass="productLabels" />
                  <Text text={description} textClass="productText" />
                </div>
                <DeliveryList />
              </div>
            </div>
            <div>
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
