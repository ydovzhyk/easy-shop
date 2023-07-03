import {  useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import { BsTrash } from 'react-icons/bs';
import { TfiPlus, TfiCheck } from 'react-icons/tfi';
import { getMessage, selectProductsFromBasket, selectSellersFromBasket } from 'redux/product/product-selectors';
import { getID } from 'redux/auth/auth-selectors';
import { getProductsFromBasket } from 'redux/product/product-operations';
import UserUpdateComponent from 'components/Shared/helper/UserUpdateComponent';
import Text from 'components/Shared/Text/Text';
// import Button from 'components/Shared/Button';
import RoundButton from 'components/Shared/RoundButton/RoundButton';
import CountBlock from './CountBlock/CountBlock';
import { SizeSelection } from './SizeSelection/SizeSelection';
import NoPhoto from 'images/catalog_photo/no_photo.jpg';
// import SellerName from './SellerName/SellerName';

import s from './Basket.module.scss';


const Basket = () => {
  const dispatch = useDispatch();
  // const [isOpen, setIsOpen] = useState(false);
  const isMessage = useSelector(getMessage);
  const userId = useSelector(getID);
  const productsFrombasket = useSelector(selectProductsFromBasket);
  const sellersFrombasket = useSelector(selectSellersFromBasket);
  const isTablet = useMediaQuery({ minWidth: 840 });
  
  console.log('productsFrombasket:', productsFrombasket);
  console.log('sellersfrombasket:', sellersFrombasket);

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
    dispatch(getProductsFromBasket(userId));
  }, [dispatch, userId]); 


  return (
    <div className={s.myWaresWrapper}>
      {isMessage === '' && <UserUpdateComponent />}
      <Text textClass="title" text="Кошик" />
      <ul className={s.orderList}>
        {groupedProducts.map(
          ({ ownerId, ownerName, products }) => (
            <li className={s.orderItem} key={ownerId}>
              <Text textClass="title" text={`Продавець: ${ownerName}`} />
              <ul>
                {products.map(({_id, nameProduct, mainPhotoUrl, brendName, price, size}) => (
                  <li className={s.wareItem} key={_id}>
                    <div className={s.photoAndNameAndPrice}>
                      <div className={s.photoAndNameAndBtn}>
                        <div className={s.photoAndName}>
                        <div className={s.thumb}>
                          <img
                            className={s.mainPhotoCard}
                            src={mainPhotoUrl}
                            onError={e => (e.target.src = NoPhoto)}
                            alt={nameProduct}
                          />
                        </div>
                        <div className={s.descriptionWrapper}>
                          <Text textClass="verifyAttention" text={brendName} />
                          <Text textClass="verifyAttention" text={nameProduct} />
                        </div>
                        
                        </div>
                        
                        {isTablet && (
                          <CountBlock
                          price={price} />
                        )}
                          <RoundButton
                            icon={BsTrash}
                            id={_id}
                          />
                      </div>
                      {size && (
                          <SizeSelection
                            size = {size}
                          />
                        )}
                      {!isTablet && (
                        <CountBlock
                          price={price} />
                      )}
                      
                    </div> 
                  </li>
                ))}
              </ul>
              <div className={s.linkWrapper}>
                <Link to='/seller/:id' className={s.btnWrapper}>
                  <Text textClass="verifyAttention" text={'Додати інші товари продавця'}/>
                  
                  <RoundButton icon={TfiPlus}/>
                </Link>
                <Link to='/checkout' className={s.btnWrapper}>
                  <Text textClass="verifyAttention" text={'Оформити замовлення'}/>
                  
                  <RoundButton icon={TfiCheck}/>
                  
                </Link>
              </div>
              
            </li>
            
          ))}
      </ul>
    </div>
    
  );
};

export default Basket;
