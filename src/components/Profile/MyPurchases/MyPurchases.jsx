import Container from "components/Shared/Container/Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "redux/order/order-operations";
import { selectUserOrders } from "redux/order/order-selectors";

import s from './MyPurchases.module.scss';
import Text from "components/Shared/Text/Text";

const MyShoppings = () => {
    const dispatch = useDispatch();
    const userOrders = useSelector(selectUserOrders);
    let page = 1;
    useEffect(() => {
      dispatch(getUserOrders(page));
    }, [dispatch, page]);
    userOrders && console.log(userOrders);
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
          <ul>
            {/* {userOrders !== [] && userOrders.orders.map(
              ({ _id, sellerName, orderSum, orderDate, orderNumber }) => (
                <li className={s.orderItem} key={_id}>
                  <div className={s.box}>
                    <p className={s.boxItem}>{sellerName}</p>
                    <p className={s.boxItem}>{`Сума: ${orderSum}`}</p>
                    <p className={s.boxItem}>{`Дата: ${orderDate}`}</p>
                    <p className={s.boxItem}>{`Номер: ${orderNumber}`}</p>
                  </div>
                </li>
              )
            )} */}
          </ul>
        </div>
      </Container>
    );
}

export default MyShoppings;