import {  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
// import { Link } from 'react-router-dom';
// import { BsTrash } from 'react-icons/bs';
// import { TfiPlus, TfiCheck } from 'react-icons/tfi';
import { getMessage, selectProductsFromBasket, selectSellersFromBasket } from 'redux/product/product-selectors';
import { getUser} from 'redux/auth/auth-selectors';
import { getProductsFromBasket } from 'redux/product/product-operations';

import Container from 'components/Shared/Container/Container';
import UserUpdateComponent from 'components/Shared/helper/UserUpdateComponent';
import Text from 'components/Shared/Text/Text';
import BasketForm from 'components/Basket/BasketForm/BasketForm';
// import RoundButton from 'components/Shared/RoundButton/RoundButton';
// import CountBlock from './CountBlock/CountBlock';
// import SizeSelection  from 'components/Basket/SizeSelection/SizeSelection';
// import NoPhoto from 'images/catalog_photo/no_photo.jpg';


import s from './Basket.module.scss';


const Basket = () => {
  const dispatch = useDispatch();
 
  const isMessage = useSelector(getMessage);
  const user = useSelector(getUser);
  const productsFrombasket = useSelector(selectProductsFromBasket);
  const sellersFrombasket = useSelector(selectSellersFromBasket);
  
  const isTablet = useMediaQuery({ minWidth: 840 });
  
  console.log('productsFrombasket:', productsFrombasket);
  // console.log('sellersfrombasket:', sellersFrombasket);
  

  const groupedProducts = sellersFrombasket.map((seller) => {
    const ownerName = seller.username;
    const ownerId = seller._id;
    const products = productsFrombasket
      .filter((product) => product.owner === ownerId)
      .map((product) => ({
        _id: product._id,
        brendName: product.brendName,
        nameProduct: product.nameProduct,
        mainPhotoUrl: product.mainPhotoUrl,
        price: product.price,
        quantity: product.quantity,
        size: product.size,

      }));
    return {
      ownerId,
      ownerName,
      products
    }
  })

  console.log('groupedProducts:', groupedProducts);

  

  useEffect(() => {
    dispatch(getProductsFromBasket(user._id));
  }, [dispatch, user]); 


  return (
    <Container>
    <section className={s.basketsSection}>
      {isMessage === '' && <UserUpdateComponent />}
      <Text textClass="title" text="Кошик" />
      <ul className={s.orderList}>
        {groupedProducts.map(
          ({ ownerId, ownerName, products }) => (
            <li className={s.orderItem} key={ownerId}>
              <BasketForm
                ownerName={ownerName}
                products={products}
                isTablet={isTablet}
              />
              
            </li>
            
          ))}
      </ul>
    </section>
    </Container>
  );
};

export default Basket;
