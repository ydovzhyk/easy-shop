import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';
import {  getUserSales, updateOrderStatus } from 'redux/order/order-operations';
import {
  getLoadingOrders,
  selectUserSales,
  selectUserSalesTotalPages,
} from 'redux/order/order-selectors';

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
    const isTablet = useMediaQuery({ minWidth: 768 });

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
  
  const handleConfirmButtonClick = (id) => {
    console.log('handleConfirmButtonClick');
    dispatch(updateOrderStatus({ orderId: id, confirmed: true, statusNew: false }));
    dispatch(
      getUserSales({
        page: currentPage,
        selectorName: currentSelector,
      })
    );
  }
  const handleCancelButtonClick = (id) => {
      console.log('handleCancelButtonClick');
      dispatch(
        updateOrderStatus({ orderId: id, confirmed: false, statusNew: false })
      );
      dispatch(
        getUserSales({
          page: currentPage,
          selectorName: currentSelector,
        })
      );
  };

  return (
    <>
      <div className={s.ordersWrapper}>
        <div>
          <p className={s.heading}>За статусом</p>
          {!isTablet && (
            <Select
              onChange={value => handleButtonClick(value.value)}
              options={[
                { value: 'all', label: 'Всі' },
                { value: 'new', label: 'Нові' },
                { value: 'confirmed', label: 'Підтверджені' },
                { value: 'canceled', label: 'Відхилені' },
              ]}
              defaultValue={{ value: 'all', label: 'Всі' }}
              theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#fbef35;',
                  primary: '#3b3b3b',
                },
              })}
            />
          )}
          {isTablet && (
            <OrderStatusList
              currentSelector={currentSelector}
              handleButtonClick={handleButtonClick}
            />
          )}
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
    </>
  );
};

export default MySales;
