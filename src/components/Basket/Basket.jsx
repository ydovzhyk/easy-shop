import { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getMessage, selectProductsFromBasket } from 'redux/product/product-selectors';
import { selectUserBasket, getID } from 'redux/auth/auth-selectors';
import UserUpdateComponent from 'components/Shared/helper/UserUpdateComponent';
// import Container from 'components/Shared/Container';

import { getProductsFromBasket } from 'redux/product/product-operations';


import s from './Basket.module.scss';


const Basket = () => {
  const dispatch = useDispatch();
  // const [isOpen, setIsOpen] = useState(false);
  const isMessage = useSelector(getMessage);
  const myBasket = useSelector(selectUserBasket);
  const productsFrombasket = useSelector(selectProductsFromBasket);
  const userId = useSelector(getID);
  
  console.log('myBasket:', myBasket);
  console.log('productsFrombasket:', productsFrombasket);

  useEffect(() => {
    dispatch(getProductsFromBasket(userId));
  }, [dispatch, userId]); 
  
  return (
    <div className={s.default}>
      {isMessage === '' && <UserUpdateComponent />}
      <ul>
        {myBasket.map(
          (id) =>
          (
            <li key={id}>
              {id}
            </li>
          ))}
      </ul>
    </div>
    // <Container>
    //   <section className={s.default}>
    //     <div className={s.defaultBox}>
    //       <h2 className={s.title}>Basket</h2>
    //     </div>
    //   </section>
    // </Container>
  );
};

export default Basket;
