import React from 'react';
import { useSelector } from 'react-redux';

import ProductItem from 'components/Shared/ProductItem/ProductItem';

// import { getVipProducts } from 'redux/product/product-operations';
import {
  getVipProductCard,
  // getVipPages,
} from 'redux/product/product-selectors';

import s from './SelectorProducts.module.scss';

const SelectorProducts = () => {
  // const dispatch = useDispatch();
  // const [currentPage, setCurrentPage] = useState(1);
  const arrayVipProducts = useSelector(getVipProductCard);
  // const vipPages = useSelector(getVipPages);

  // useEffect(() => {
  //   dispatch(getVipProducts(currentPage));
  // }, [dispatch, currentPage]);
  // console.log(arrayVipProducts);

  return (
    <>
      <ul className={s.listCard}>
        {arrayVipProducts.map(item => (
          <ProductItem
            key={item._id}
            mainPhotoUrl={item.mainPhotoUrl}
            price={item.price}
            nameProduct={item.nameProduct}
            description={item.description}
            section={item.section}
            category={item.category}
          />
        ))}
      </ul>
    </>
  );
};

export default SelectorProducts;
