import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { useMediaQuery } from 'react-responsive';
import { getUserOrders } from 'redux/order/order-operations';
import {
  getLoadingOrders,
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
  const isLoading = useSelector(getLoadingOrders);
  const isTablet = useMediaQuery({ minWidth: 768 });

  const [currentPage, setCurrentPage] = useState(1);
  const [currentSelector, setcurrentSelector] = useState("all");

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
          )}
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
                statusNew,
                confirmed,
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
                </li>
              )
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
    </>
  );
}

export default MyShoppings;