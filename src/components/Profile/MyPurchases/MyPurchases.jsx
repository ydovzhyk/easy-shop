import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteOrderById } from "redux/order/order-operations";
import { getUserOrders } from 'redux/order/order-operations';
import {
  selectUserOrders,
  selectUserOrdersTotalPages,
} from 'redux/order/order-selectors';

import s from './MyPurchases.module.scss';
import OrderProductsList from "components/Shared/OrderProductsList/OrderProductsList";

const MyShoppings = () => {
    const dispatch = useDispatch();
    
    let page = 1;
    useEffect(() => {
      dispatch(getUserOrders(page));
    }, [dispatch, page]);

    const userOrders = useSelector(selectUserOrders);
    // userOrders && console.log(userOrders);

    const totalPages = useSelector(selectUserOrdersTotalPages);
    totalPages && console.log(totalPages);

    // const handleDeteleOrder = (id) => {
    //   dispatch(deleteOrderById(id));
    // }
    return (
      <>
        <div className={s.ordersWrapper}>
          <div>
            <p className={s.heading}>За статусом</p>
            <ul className={s.optionsList}>
              <li>Нові</li>
              <li>Підтверджені</li>
              <li>Виконані</li>
              <li>Відхилені</li>
            </ul>
          </div>
          <ul className={s.ordersList}>
            {userOrders?.map(
              ({
                _id,
                sellerName,
                orderSum,
                orderDate,
                orderNumber,
                products,
                productInfo,
                delivery,
              }) => (
                <li className={s.orderItem} key={_id}>
                  <div className={s.orderInfoWrapper}>
                    <div className={s.orderInfoItem}>
                      <p>Продавець:</p>
                      <p>{sellerName}</p>
                    </div>
                    <div className={s.orderInfoItem}>
                      <p>Замовлення &#8470; {orderNumber}</p>
                      <p>{orderDate}</p>
                    </div>

                    {/* <button
                      type="button"
                      onClick={() => handleDeteleOrder(_id)}
                    >
                      del
                    </button> */}
                  </div>
                  <OrderProductsList
                    productsForOrder={productInfo}
                    products={products}
                  />
                  <div className={s.orderBottomWrapper}>
                    {delivery !== '' ? <p>Очікує підтвердження</p> : <button>Оформити замовлення</button>}

                    <p
                      className={s.orderSum}
                    >{`Сума замовлення: ${orderSum} грн.`}</p>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </>
    );
}

export default MyShoppings;