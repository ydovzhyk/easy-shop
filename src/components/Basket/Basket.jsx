import {  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
// import { useMediaQuery } from 'react-responsive';

import { getMessage, selectProductsFromBasket, selectSellersFromBasket } from 'redux/product/product-selectors';
import { getUser, selectBasketProducts} from 'redux/auth/auth-selectors';
import { getProductsFromBasket } from 'redux/product/product-operations';

import Container from 'components/Shared/Container/Container';
import UserUpdateComponent from 'components/Shared/helper/UserUpdateComponent';
import Text from 'components/Shared/Text/Text';
import BasketForm from 'components/Basket/BasketForm/BasketForm';
import { BsBasket } from 'react-icons/bs';

import s from './Basket.module.scss';

const Basket = () => {
  const dispatch = useDispatch();

  const isMessage = useSelector(getMessage);
  const user = useSelector(getUser);
  const productsFrombasket = useSelector(selectProductsFromBasket);
  const sellersFrombasket = useSelector(selectSellersFromBasket);
  const selectedProductsWithSizes = useSelector(selectBasketProducts);
  // const isTablet = useMediaQuery({ minWidth: 768 });

  const groupedProducts = sellersFrombasket.map((seller) => {
    const ownerName = seller.username;
    const ownerId = seller._id;
    const products = productsFrombasket
      .filter((product) => product.owner === ownerId)
      .map((product) => {
        const matchedProduct = selectedProductsWithSizes
          .flatMap((arr) => arr)
          .find((sp) => sp.productId === product._id);
        const selectedSizes = matchedProduct ? matchedProduct.selectedSizes : [];
        const changedPrice = product.sale
          ? (product.price * (100 - product.sale)) / 100
          : product.price;
        return {
          _id: product._id,
          brendName: product.brendName,
          nameProduct: product.nameProduct,
          mainPhotoUrl: product.mainPhotoUrl,
          price: changedPrice,
          size: selectedSizes,
          section: product.section,
          category: product.category,
        };
      });

    return {
      ownerId,
      ownerName,
      products,
    };
  });

  useEffect(() => {
    dispatch(getProductsFromBasket(user._id));
  }, [dispatch, user]); 
  
  return (
    <Container>
      <section className={s.basketsSection}>
        {isMessage === '' && <UserUpdateComponent />}
        <Text textClass="title" text="Кошик" />
        <ul className={s.orderList}>
          {groupedProducts.map(({ ownerId, ownerName, products }) => (
            <li className={s.orderItem} key={ownerId}>
              <BasketForm
                ownerId={ownerId}
                ownerName={ownerName}
                products={products}
              />
            </li>
          ))}
        </ul>
        {groupedProducts.length === 0 && (
          <div className={s.basketMessageBox}>
            <BsBasket size={46} />
            <p style={{ fontSize: 28 }}>Тут поки пусто</p>
            <p>Перегляньте наші новинки та поновіть свій гардероб</p>
            <NavLink className={s.btnLight} to="/">
              Перейти до покупок
            </NavLink>
          </div>
        )}
      </section>
    </Container>
  );
};

export default Basket;
