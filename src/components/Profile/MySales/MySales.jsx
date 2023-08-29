import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSales, updateOrderStatus } from 'redux/order/order-operations';
import {
  getLoadingOrders,
  selectUserSales,
  selectUserSalesTotalPages,
} from 'redux/order/order-selectors';
import { orderConfirmationDialogue } from 'redux/dialogue/dialogue-operations';

import OrderProductsList from 'components/Shared/OrderProductsList/OrderProductsList';
import Pagination from 'components/Shared/Pagination/Pagination';
import Button from 'components/Shared/Button/Button';
import OrderStatusList from 'components/Shared/OrderStatusList/OrderStatusList';
import s from './MySales.module.scss';

const MySales = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingOrders);
  const userSales = useSelector(selectUserSales);
  const totalPages = useSelector(selectUserSalesTotalPages);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentSelector, setcurrentSelector] = useState('all');

  useEffect(() => {
    dispatch(
      getUserSales({
        page: currentPage,
        selectorName: currentSelector,
      })
    );
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [dispatch, currentPage, currentSelector]);

  // for pagination
  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleButtonClick = optionName => {
    setcurrentSelector(optionName);
    setCurrentPage(1);
  };

  const handleChangeOrderStatus = (id, confirmed, typeDialogue) => {
    dispatch(
      updateOrderStatus({
        orderId: id,
        confirmed: confirmed,
        statusNew: false,
      })
    );
    dispatch(
      getUserSales({
        page: currentPage,
        selectorName: currentSelector,
      })
    );
    dispatch(
      orderConfirmationDialogue({
        orderId: id,
        typeDialogue: typeDialogue,
      })
    );
  };

  return (
    <>
      <div className={s.ordersWrapper}>
        <OrderStatusList
          currentSelector={currentSelector}
          handleButtonClick={handleButtonClick}
        />
        {userSales.length > 0 && (
          <ul className={s.ordersList}>
            {userSales.map(
              ({
                _id,
                orderSum,
                orderDate,
                orderNumber,
                products,
                productInfo,
                client,
                statusNew,
                confirmed,
              }) => (
                <li className={s.orderItem} key={_id}>
                  <div className={s.orderInfoWrapper}>
                    <div className={s.orderInfoItem}>
                      <p>Покупець:</p>
                      <p>
                        {client.customerSecondName} {client.customerFirstName}
                      </p>
                      <p>Номер телефону: {client.customerTel}</p>
                    </div>
                    <div className={s.orderInfoItem}>
                      <p>Замовлення &#8470; {orderNumber}</p>
                      <p>{orderDate}</p>
                    </div>
                  </div>
                  <OrderProductsList
                    productsForOrder={productInfo}
                    products={products}
                  />
                  <div className={s.orderBottomWrapper}>
                    {statusNew === true ? (
                      <>
                        <Button
                          type="button"
                          btnClass="btnLight"
                          text="Підтвердити замовлення"
                          handleClick={() =>
                            handleChangeOrderStatus(_id, true, 'sales')
                          }
                        />
                        <Button
                          type="button"
                          btnClass="btnDark"
                          text="Скасувати замовлення"
                          handleClick={() =>
                            handleChangeOrderStatus(_id, false, 'cancel')
                          }
                        />
                      </>
                    ) : (
                      <p className={s.waitingPhrase}>
                        {confirmed === true ? 'Підтверджено' : 'Скасовано'}
                      </p>
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
        {!isLoading && userSales.length === 0 && (
          <p className={s.message}>Замовлень з таким статусом у вас ще немає</p>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </>
  );
};

export default MySales;
