import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSales, updateOrderStatus } from 'redux/order/order-operations';
import {
  getLoadingOrders,
  selectUserSales,
  selectUserSalesTotalPages,
} from 'redux/order/order-selectors';
import { getID } from 'redux/auth/auth-selectors';
import { selectUserReviews } from 'redux/review/review-selectors';
import { getUserReviews } from 'redux/review/review-operations';
import { orderConfirmationDialogue } from 'redux/dialogue/dialogue-operations';

import OrderProductsList from 'components/Shared/OrderProductsList/OrderProductsList';
import Pagination from 'components/Shared/Pagination/Pagination';
import Button from 'components/Shared/Button/Button';
import OrderStatusList from 'components/Shared/OrderStatusList/OrderStatusList';
import FeedbackWindow from 'components/Shared/FeedbackWindow/FeedbackWindow';
import Dialogue from 'components/Dialogue/Dialogue';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './MySales.module.scss';

const MySales = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoadingOrders);
  const userId = useSelector(getID);
  const userSales = useSelector(selectUserSales);
  const totalPages = useSelector(selectUserSalesTotalPages);
  const myReview = useSelector(selectUserReviews);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentSelector, setcurrentSelector] = useState('all');
  const [isFeedbackWindowOpen, setIsFeedbackWindowOpen] = useState(false);
  const [orderToFeedbackWindow, setOrderToFeedbackWindow] = useState({});
  const [isMessage, setIsMessage] = useState(false);
  const [productId, setProductId] = useState(null);
  const [customerId, setCustomerId] = useState(null);

  useEffect(() => {
    dispatch(getUserReviews({ userId }));
  }, [dispatch, userId, orderToFeedbackWindow]);

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
    setProductId(product);
    setCustomerId(customer);
  };

  const handleDismissClick = () => {
    setIsMessage(false);
    setProductId(null);
    setCustomerId(null);
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

  const toggleIsOpen = (orderId, sellerId, productInfo, customerId) => {
    if (orderId) {
      setOrderToFeedbackWindow({ orderId, sellerId, productInfo, customerId });
      setIsFeedbackWindowOpen(!isFeedbackWindowOpen);
      return;
    }
    setOrderToFeedbackWindow({});
    setIsFeedbackWindowOpen(!isFeedbackWindowOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isFeedbackWindowOpen ? 'hidden' : 'unset';
  }, [isFeedbackWindowOpen]);
  const filteredSales = userSales.filter(({ delivery }) => delivery !== "");
  return (
    <>
      <div className={s.ordersWrapper}>
        <OrderStatusList
          currentSelector={currentSelector}
          handleButtonClick={handleButtonClick}
        />
        {filteredSales.length > 0 && (
          <ul className={s.ordersList}>
            {filteredSales.map(
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
                sellerId,
              }) => {
                const isBtnRewiewShown = myReview.find(
                  ({ orderId }) => orderId === _id
                );
                return (
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
                    {statusNew === false && (
                      <div className={s.buttonBottomWrapper}>
                        <Button
                          type="button"
                          btnClass="btnLight"
                          text="Питання покупцю"
                          handleClick={() =>
                            handleMessageClick(
                              products[0]._id,
                              client.customerId
                            )
                          }
                        />
                        {!isBtnRewiewShown && (
                          <Button
                            btnClass="btnLight"
                            text="Залишити відгук"
                            handleClick={() =>
                              toggleIsOpen(
                                _id,
                                sellerId,
                                productInfo,
                                client.customerId
                              )
                            }
                          />
                        )}
                      </div>
                    )}
                    {isFeedbackWindowOpen && (
                      <FeedbackWindow
                        hideWindow={toggleIsOpen}
                        orderToFeedbackWindow={orderToFeedbackWindow}
                        feedbackType={'asSeller'}
                      />
                    )}
                  </li>
                );
              }
            )}
          </ul>
        )}
        {!isLoading && filteredSales.length === 0 && (
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
              _id: productId,
              owner: userId,
              customer: customerId,
            }}
          />
        </div>
      )}
    </>
  );
};

export default MySales;
