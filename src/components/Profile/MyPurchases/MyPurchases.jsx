import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
// import { deleteOrderById } from "redux/order/order-operations";
import { getUserOrders } from 'redux/order/order-operations';
import {
  selectUserOrders,
  selectUserOrdersTotalPages,
} from 'redux/order/order-selectors';
import { getLogin } from 'redux/auth/auth-selectors';

import OrderProductsList from "components/Shared/OrderProductsList/OrderProductsList";
import Pagination from 'components/Shared/Pagination/Pagination';
import s from './MyPurchases.module.scss';


const MyShoppings = () => {
  const dispatch = useDispatch();
  const isLogin = useSelector(getLogin);

  const [currentPage, setCurrentPage] = useState(1);
  // console.log('currentPage', currentPage);
  const [currentSelector, setcurrentSelector] = useState("all");
  console.log('currentSelector', currentSelector);

  const totalPages = useSelector(selectUserOrdersTotalPages);
  console.log("totalPages", totalPages);

  useEffect(() => {
    dispatch(
      getUserOrders({
        page: currentPage,
        selectorName: currentSelector,
      })
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, currentPage, currentSelector]);

  const userOrders = useSelector(selectUserOrders);
  userOrders && console.log(userOrders.length);

  // for pagination
  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleButtonClick = optionName => {
    setcurrentSelector(optionName);
  };

  // const handleDeteleOrder = (id) => {
  //   dispatch(deleteOrderById(id));
  // }

  return (
    <>
      <div className={s.ordersWrapper}>
        <div>
          <p className={s.heading}>За статусом</p>
          <ul className={s.optionsList}>
            <li>
              <button
                className={
                  currentSelector === 'all'
                    ? `${s.selectButton} ${s.active}`
                    : s.selectButton
                }
                onClick={() => handleButtonClick('all')}
              >
                Всі
              </button>
            </li>
            <li>
              <button
                className={
                  currentSelector === 'new'
                    ? `${s.selectButton} ${s.active}`
                    : s.selectButton
                }
                onClick={() => handleButtonClick('new')}
              >
                Нові
              </button>
            </li>
            <li>
              <button
                className={
                  currentSelector === 'confirmed'
                    ? `${s.selectButton} ${s.active}`
                    : s.selectButton
                }
                onClick={() => handleButtonClick('confirmed')}
              >
                Підтверджені
              </button>
            </li>
            {/* <li>Виконані</li> */}
            <li>
              <button
                className={
                  currentSelector === 'canceled'
                    ? `${s.selectButton} ${s.active}`
                    : s.selectButton
                }
                onClick={() => handleButtonClick('canceled')}
              >
                Відхилені
              </button>
            </li>
          </ul>
        </div>
        {userOrders.length > 0 && (
          <ul className={s.ordersList}>
            {userOrders.map(
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
                    {delivery !== '' ? (
                      <p className={s.waitingPhrase}>Очікує підтвердження</p>
                    ) : (
                      <NavLink
                        to={isLogin ? '/checkout' : '/login'}
                        className={s.btnLight}
                        state={{ orderId: _id }}
                      >
                        Оформити замовлення
                      </NavLink>
                    )}

                    <p
                      className={s.orderSum}
                    >{`Сума замовлення: ${orderSum} грн.`}</p>
                  </div>
                </li>
              )
            )}
          </ul>
        )}

        {userOrders.length === 0 && (
          <p className={s.message}>Замовлень з таким статусом у вас ще немає</p>
        )}
      </div>
      {totalPages > 0 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
}

export default MyShoppings;