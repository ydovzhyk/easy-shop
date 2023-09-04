import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from 'redux/order/order-operations';
import {
  getLoadingOrders,
  selectUserOrders,
  selectUserOrdersTotalPages,
} from 'redux/order/order-selectors';
import { getID, getLogin } from 'redux/auth/auth-selectors';
import { selectUserReviews } from 'redux/review/review-selectors';
import { getUserReviews } from 'redux/review/review-operations';

import OrderProductsList from 'components/Shared/OrderProductsList/OrderProductsList';
import Pagination from 'components/Shared/Pagination/Pagination';
import OrderStatusList from 'components/Shared/OrderStatusList/OrderStatusList';
import Button from 'components/Shared/Button/Button';
import FeedbackWindow from 'components/Shared/FeedbackWindow/FeedbackWindow';
import Dialogue from 'components/Dialogue/Dialogue';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import s from './MyPurchases.module.scss';

const MyShoppings = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getID);
  const isLogin = useSelector(getLogin);
  const isLoading = useSelector(getLoadingOrders);
  const myReview = useSelector(selectUserReviews);

  const [currentPage, setCurrentPage] = useState(1);
  const [currentSelector, setcurrentSelector] = useState('all');
  const [isFeedbackWindowOpen, setIsFeedbackWindowOpen] = useState(false);
  const [orderToFeedbackWindow, setOrderToFeedbackWindow] = useState({});
  const [isMessage, setIsMessage] = useState(false);
  const [productId, setProductId] = useState(null);
  const [sellerId, setSellerId] = useState(null);

  useEffect(() => {
    dispatch(getUserReviews({ userId }));
  }, [dispatch, userId, orderToFeedbackWindow]);

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
  const totalPages = useSelector(selectUserOrdersTotalPages);

  // for pagination
  const handlePageChange = page => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleButtonClick = optionName => {
    setcurrentSelector(optionName);
    setCurrentPage(1);
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

  const handleMessageClick = (product, seller) => {
    setIsMessage(true);
    setProductId(product);
    setSellerId(seller);
  };

  const handleDismissClick = () => {
    setIsMessage(false);
    setProductId(null);
    setSellerId(null);
  };

  return (
    <>
      <div className={s.ordersWrapper}>
        <OrderStatusList
          currentSelector={currentSelector}
          handleButtonClick={handleButtonClick}
        />
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
                statusNew,
                confirmed,
                sellerId,
                client,
              }) => {
                const isBtnRewiewShown = myReview.find(
                  ({ orderId }) => orderId === _id
                );
                return (
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
                    </div>
                    <OrderProductsList
                      productsForOrder={productInfo}
                      products={products}
                    />
                    <div className={s.orderBottomWrapper}>
                      {delivery !== '' && statusNew === true && (
                        <p className={s.waitingPhrase}>Очікує підтвердження</p>
                      )}
                      {delivery === '' && statusNew === true && (
                        <NavLink
                          to={isLogin ? '/checkout' : '/login'}
                          className={s.btnLight}
                          state={{ orderId: _id }}
                        >
                          Оформити замовлення
                        </NavLink>
                      )}
                      {statusNew === false && (
                        <p className={s.waitingPhrase}>
                          {confirmed === true ? 'Підтверджено' : 'Скасовано'}
                        </p>
                      )}

                      <p
                        className={s.orderSum}
                      >{`Сума замовлення: ${orderSum} грн.`}</p>
                    </div>
                    <div className={s.buttonBottomWrapper}>
                      <Button
                        type="button"
                        btnClass="btnLight"
                        text="Питання продавцю"
                        handleClick={() =>
                          handleMessageClick(products[0]._id, sellerId)
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
                    {isFeedbackWindowOpen && (
                      <FeedbackWindow
                        hideWindow={toggleIsOpen}
                        orderToFeedbackWindow={orderToFeedbackWindow}
                        feedbackType={'asCustomer'}
                      />
                    )}
                  </li>
                );
              }
            )}
          </ul>
        )}
        {!isLoading && userOrders.length === 0 && (
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
              seller: sellerId,
            }}
          />
        </div>
      )}
    </>
  );
};

export default MyShoppings;
