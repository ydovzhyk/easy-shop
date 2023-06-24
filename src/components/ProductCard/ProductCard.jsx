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

import { getLogin } from 'redux/auth/auth-selectors';
import ProductSizes from './Productsizes';
import ProductInfo from './ProductInfo';

const ProductCard = () => {
  const chattingRef = useRef();
  const { category, subcategory, id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductById(id));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [dispatch, id]);

  const product = useSelector(selectProductById);
  const isLogin = useSelector(getLogin);
  // console.log( id, product);
  let categoryName = '';
  let subCategoryName = '';

  switch (category) {
    case 'women':
      categoryName = 'Жінкам';
      break;
    case 'men':
      categoryName = 'Чоловікам';
      break;
    case 'children':
      categoryName = 'Дитячі товари';
      break;
    case 'beauty&health':
      categoryName = "Краса та здоров'я";
      break;
    default:
      break;
  }

  if (category === 'men') {
    switch (subcategory) {
      case 'outerwear':
        subCategoryName = 'Верхній одяг';
        break;
      case 'jackets & suits':
        subCategoryName = 'Піджаки і костюми';
        break;
      case 'coats & tops':
        subCategoryName = 'Кофти та светри';
        break;
      case 'shirts & t-shirts':
        subCategoryName = 'Сорочки та теніски';
        break;
      case 't-shirts & tank tops':
        subCategoryName = 'Футболки та майки';
        break;
      case 'underwear':
        subCategoryName = 'Нижня білизна';
        break;
      case 'shoes':
        subCategoryName = 'Взуття';
        break;
      case 'accessories':
        subCategoryName = 'Аксесуари';
        break;
      case 'sportswear':
        subCategoryName = 'Спортивний одяг';
        break;
      case 'clothing for home and sleep':
        subCategoryName = 'Одяг для дому та сну';
        break;
      case 'special clothing':
        subCategoryName = 'Спецодяг';
        break;
      case 'tactical clothing':
        subCategoryName = 'Тактичний одяг';
        break;
      case 'pants and shorts':
        subCategoryName = 'Штани та шорти';
        break;
      default:
        break;
    }
  }
  if (category === 'women') {
    switch (subcategory) {
      case 'outerwear':
        subCategoryName = 'Верхній одяг';
        break;
      case 'dresses':
        subCategoryName = 'Плаття';
        break;
      case 'skirts':
        subCategoryName = 'Спідниці';
        break;
      case 't-shirts and t-shirts':
        subCategoryName = 'Майки і футболки';
        break;
      case 'shirts and blouses':
        subCategoryName = 'Сорочки та блузи';
        break;
      case 'Светри':
        subCategoryName = 'Coats';
        break;
      case 'underwear':
        subCategoryName = 'Нижня білизна';
        break;
      case 'accessories':
        subCategoryName = 'Аксесуари';
        break;
      case 'other things':
        subCategoryName = 'Інші речі';
        break;
      case 'sportswear':
        subCategoryName = 'Спортивний одяг';
        break;
      case 'suits':
        subCategoryName = 'Костюми';
        break;
      case 'overalls':
        subCategoryName = 'Комбінезони';
        break;
      case 'clothes for home and sleep':
        subCategoryName = 'Одяг для дому та сну';
        break;
      case 'special clothes':
        subCategoryName = 'Спецодяг';
        break;
      case 'for pregnant women':
        subCategoryName = 'Для вагітних';
        break;
      case 'shoes':
        subCategoryName = 'Взуття';
        break;
      case 'pants and shorts':
        subCategoryName = 'Штани та шорти';
        break;
      default:
        break;
    }
  }

  if (category === 'children') {
    switch (subcategory) {
      case "children's room":
        subCategoryName = 'Дитяча кімната';
        break;
      case 'products for mothers':
        subCategoryName = 'Товари для мам';
        break;
      case 'food and feeding':
        subCategoryName = 'Харчування і годування';
        break;
      case 'daily care':
        subCategoryName = 'Щоденний догляд';
        break;
      case 'strollers and car seats':
        subCategoryName = 'Коляски та автокрісла';
        break;
      case "children's toys":
        subCategoryName = 'Дитячі іграшки';
        break;
      case "children's transport":
        subCategoryName = 'Дитячий транспорт';
        break;
      case 'products for creativity':
        subCategoryName = 'Товари для творчості';
        break;
      case 'active recreation':
        subCategoryName = 'Активний відпочинок';
        break;
      default:
        break;
    }
  }

  if (category === 'beauty&health') {
    switch (subcategory) {
      case "men's cosmetics":
        subCategoryName = 'Чоловіча косметика';
        break;
      case 'beauty accessories':
        subCategoryName = 'Аксесуари для краси';
        break;
      case 'decorative cosmetics':
        subCategoryName = 'Декоративна косметика';
        break;
      case 'perfume':
        subCategoryName = 'Парфуми';
        break;
      case 'manicure and pedicure':
        subCategoryName = 'Манікюр і педикюр';
        break;
      case 'hair cosmetics':
        subCategoryName = 'Косметика для волосся';
        break;
      case 'face cosmetics':
        subCategoryName = 'Косметика для обличчя';
        break;
      case 'body and bath':
        subCategoryName = 'Тіло і ванна';
        break;
      case 'self-care':
        subCategoryName = 'Догляд за собою';
        break;
      case 'techniques for beauty':
        subCategoryName = 'Техніка для краси';
        break;
      case 'gift sets':
        subCategoryName = 'Подарункові набори';
        break;
      case 'disinfectants':
        subCategoryName = 'Дезінфікуючи засоби';
        break;
      case 'medical devices':
        subCategoryName = 'Медичні прилади';
        break;
      case 'home pharmacy':
        subCategoryName = 'Домашня аптека';
        break;
      case 'optics':
        subCategoryName = 'Оптика';
        break;
      default:
        break;
    }
  }

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
