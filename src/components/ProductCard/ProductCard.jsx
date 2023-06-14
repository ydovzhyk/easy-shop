import { useParams, useLocation, Link } from 'react-router-dom';
import Container from 'components/Shared/Container/Container';
import s from './ProductCard.module.scss';
import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import { BsSuitHeart } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';

import SellerInfo from './SellerInfo/SellerInfo';
import DeliveryList from './DeliveryList';

const ProductCard = () => {
  const { category, subcategory, id } = useParams();
  // const product = getProductById(id);
  const location = useLocation();
  console.log(location, id);
  // const backLinkHref = location.state?.from ?? '/products';

  return (
    <section className={s.productCard}>
      <Container>
        <p className={s.navigation}>
          <Link to={`/`}>Easy shop </Link> &#8250;
          <Link to={`/products/${category}`}> {category} </Link>&#8250;
          <Link to={`/products/${category}/${subcategory}`}> {subcategory} </Link>
        </p>
        <div className={s.productCardWrapper}>
          <div>
            <div className={s.productMainInfo}>
              <div className={s.fotoContainer}>
                <div className={s.fotoGalery}>foto</div>
              </div>
              <div>
                <p className={s.availability}>В наявності</p>
                <Text text="Футболка з принтом" textClass="productName" />
                <div className={s.productPrice}>
                  <span className={s.productOldPrice}>379 грн</span>
                  <span className={s.productPriceDiscount}>-8%</span>
                  <Text text="349 грн" textClass="title" />
                </div>
                <Text text="Розміри:" textClass="productLabels" />
                <div className={s.size}>
                  <Text
                    text={`EU: 40 / UA: 48 / IN: L `}
                    textClass="after-title-bigger"
                  />
                </div>
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
                    <Text text="Поставити запитання" textClass="productText" />
                  </div>
                </div>
              </div>
            </div>

            <ul className={s.productInfo}>
              <li className={s.productDescription}>
                <Text text="Стан:" textClass="productLabels" />
                <Text text="Новий" textClass="productText" />
              </li>
              <li className={s.productDescription}>
                <Text text="Бренд:" textClass="productLabels" />
                <Text text="Goldi" textClass="productText" />
              </li>
              <li className={s.productDescription}>
                <Text text="Категорії:" textClass="productLabels" />
                <Text text="Майки й футболки" textClass="productText" />
              </li>
            </ul>
            <div className={s.productDetails}>
              <div className={s.productDescription}>
                <Text text="Опис товару:" textClass="productLabels" />
                <Text
                  text="100% оплата на карту і я висилаю вам річ! Є обмін та повернення! Працюємо по накладеному з передплатою в 150 грн!"
                  textClass="productText"
                />
              </div>
              <DeliveryList />
            </div>
          </div>
          <div>
            <Text text="Продавець:" textClass="productLabels" />
            <div className={s.sellerInfo}>
              <SellerInfo />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ProductCard;
