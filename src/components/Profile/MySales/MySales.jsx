import { useEffect, useState } from 'react';
// import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {  getUserSales } from 'redux/order/order-operations';
import {
  getLoadingOrders,
  selectUserSales,
  selectUserSalesTotalPages,
} from 'redux/order/order-selectors';
// import { getLogin } from 'redux/auth/auth-selectors';

import OrderProductsList from 'components/Shared/OrderProductsList/OrderProductsList';
import Pagination from 'components/Shared/Pagination/Pagination';
import Button from 'components/Shared/Button/Button';
import s from './MySales.module.scss';

const MySales = () => {
    const dispatch = useDispatch();
    // const isLogin = useSelector(getLogin);
    const isLoading = useSelector(getLoadingOrders);
    const userSales = useSelector(selectUserSales);
    const totalPages = useSelector(selectUserSalesTotalPages);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentSelector, setcurrentSelector] = useState('all');
    console.log(currentSelector);

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
  
  const handleConfirmButtonClick = () => {
    console.log('handleConfirmButtonClick');
    }
  const handleCancelButtonClick = () => {
    console.log('handleCancelButtonClick');
  };
 
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
                          handleClick={handleConfirmButtonClick}
                        />
                        <Button
                          type="button"
                          btnClass="btnDark"
                          text="Скасувати замовлення"
                          handleClick={handleCancelButtonClick}
                        />
                      </>
                    ) : (
                      <p className={s.waitingPhrase}>{confirmed === true ? "Підтверджено" : "Скасовано"}</p>
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
