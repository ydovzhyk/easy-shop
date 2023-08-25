import { useState } from 'react';
import OrderStatusList from 'components/Shared/OrderStatusList/OrderStatusList';

import s from 'components/SellerInfo/SellerSales/SellerSales.module.scss';

const SellerSales = () => {
  // const [currentPage, setCurrentPage] = useState(1);
  const [currentSelector, setcurrentSelector] = useState('all');

  const handleButtonClick = optionName => {
    setcurrentSelector(optionName);
    // setCurrentPage(1);
  };

  return (
    <>
      <div className={s.ordersWrapper}>
        <OrderStatusList
          currentSelector={currentSelector}
          handleButtonClick={handleButtonClick}
        />
      </div>
    </>
  );
};

export default SellerSales;
