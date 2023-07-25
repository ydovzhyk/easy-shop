import Container from "components/Shared/Container/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrderById, getUserOrders } from "redux/order/order-operations";
import {
  selectUserOrders,
  selectUserOrdersTotalPages,
} from 'redux/order/order-selectors';

import s from './MyPurchases.module.scss';
import Text from "components/Shared/Text/Text";

const MyShoppings = () => {
    const dispatch = useDispatch();
    
    let page = 1;
    useEffect(() => {
      dispatch(getUserOrders(page));
    }, [dispatch, page]);

    const userOrders = useSelector(selectUserOrders);
    userOrders && console.log(userOrders);

    const totalPages = useSelector(selectUserOrdersTotalPages);
    totalPages && console.log(totalPages);

    const handleDeteleOrder = (id) => {
      dispatch(deleteOrderById(id));
    }
    return (
      <Container>
        <h3>Мої покупки</h3>
        <div className={s.ordersWrapper}>
          <div>
            <Text textClass="title" text={`За статусом`} />
            <ul className={s.optionsList}>
              <li>Нові</li>
              <li>Підтверджені</li>
              <li>Виконані</li>
              <li>Відхилені</li>
              <li>Архівні</li>
            </ul>
          </div>
          <ul className={s.ordersList}>
            {userOrders?.map(
              ({ _id, sellerName, orderSum, orderDate, orderNumber }) => (
                <li className={s.orderItem} key={_id}>
                  <div className={s.box}>
                    <p className={s.boxItem}>{sellerName}</p>
                    <p className={s.boxItem}>{`Сума: ${orderSum}`}</p>
                    <p className={s.boxItem}>{`Дата: ${orderDate}`}</p>
                    <p className={s.boxItem}>{`Номер: ${orderNumber}`}</p>
                    <button
                      type="button"
                      onClick={() => handleDeteleOrder(_id)}
                    >
                      delete
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </Container>
    );
}

export default MyShoppings;