import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSales, updateOrderStatus } from 'redux/order/order-operations';
import { getUser } from 'redux/auth/auth-selectors';
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
import Dialogue from 'components/Dialogue/Dialogue';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './MySales.module.scss';

const MySales = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingOrders);
  const userSales = useSelector(selectUserSales);
  const totalPages = useSelector(selectUserSalesTotalPages);
  const user = useSelector(getUser);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentSelector, setcurrentSelector] = useState('all');
  const [isMessage, setIsMessage] = useState(false);
  const [messageId, setMessageId] = useState('');
  const [customerId, setCustomerId] = useState('');

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

  const handleMessageClick = (product, customer) => {
    setIsMessage(true);
    setMessageId(product);
    setCustomerId(customer);
  };

  const handleButtonClick = optionName => {
    setcurrentSelector(optionName);
    setCurrentPage(1);
  };

  const handleConfirmButtonClick = id => {
    dispatch(
      updateOrderStatus({ orderId: id, confirmed: true, statusNew: false })
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
        typeDialogue: 'sales',
      })
    );
  };
  const handleCancelButtonClick = id => {
    dispatch(
      updateOrderStatus({ orderId: id, confirmed: false, statusNew: false })
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
        typeDialogue: 'cancel',
      })
    );
  };

  const handleDismissClick = () => {
    setIsMessage(false);
    setMessageId('');
    setCustomerId('');
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

                  <Button
                    type="button"
                    btnClass="btnLight"
                    text="Спитати покупця"
                    handleClick={() =>
                      handleMessageClick(products[0]._id, client.customerId)
                    }
                  />

                  <div className={s.orderBottomWrapper}>
                    {statusNew === true ? (
                      <>
                        <Button
                          type="button"
                          btnClass="btnLight"
                          text="Підтвердити замовлення"
                          handleClick={() => handleConfirmButtonClick(_id)}
                        />
                        <Button
                          type="button"
                          btnClass="btnDark"
                          text="Скасувати замовлення"
                          handleClick={() => handleCancelButtonClick(_id)}
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
      {isMessage && (
        <div className={s.messageWindow}>
          <button className={s.dismissButton} onClick={handleDismissClick}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>
          <Dialogue
            productInfo={{
              _id: messageId,
              owner: user._id,
              customer: customerId,
            }}
          />
        </div>
      )}
    </>
  );
};

export default MySales;
