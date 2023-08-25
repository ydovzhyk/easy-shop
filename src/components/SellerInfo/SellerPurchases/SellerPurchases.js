import { useEffect, useState } from 'react';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';

import { selectOtherUser } from 'redux/otherUser/otherUser-selectors';
import OrderStatusList from 'components/Shared/OrderStatusList/OrderStatusList';
import Pagination from 'components/Shared/Pagination/Pagination';

import s from 'components/SellerInfo/SellerPurchases/SellerPurchases.module.scss';

const SellerPurchases = () => {
  //   const dispatch = useDispatch();
  const sellerInfo = useSelector(selectOtherUser);
  console.log('sellerInfo in SellerPurchases:', sellerInfo);
  const sellerOrders = sellerInfo.userOrders;
  console.log('sellerOrders in SellerPurchases:', sellerOrders);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentSelector, setcurrentSelector] = useState('all');

  const handleButtonClick = optionName => {
    setcurrentSelector(optionName);
    setCurrentPage(1);
  };

  return (
    // <div>"Покупки продавця"</div>;
    <>
      <div className={s.ordersWrapper}>
        <OrderStatusList
          currentSelector={currentSelector}
          handleButtonClick={handleButtonClick}
        />
      </div>
      {/* {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        /> */}
    </>
  );
};

export default SellerPurchases;
