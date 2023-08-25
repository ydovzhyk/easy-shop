import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromOtherUser } from 'redux/product/product-operations';
import { selectProductsFromOtherUther } from 'redux/product/product-selectors';
import ProductItem from 'components/Shared/ProductItem/ProductItem';

import s from 'components/SellerInfo/SellerWares/SellerWares.module.scss';

const SellerWares = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch( getProductsFromOtherUser(id));
  }, [dispatch, id]);
    
  const sellerProducts = useSelector(selectProductsFromOtherUther);
  // console.log('sellerProducts in Wares:', sellerProducts);
  // const productsNamesArray = sellerProducts.map(product =>{ return product.nameProduct});
  // console.log(productsNamesArray);
    return (
      <section>
        <ul className={s.listCard}>
              {sellerProducts.map(
                ({
                  _id,
                  mainPhotoUrl,
                  price,
                  nameProduct,
                  description,
                  section,
                  category,
                  size,
                }) => (
                  <ProductItem
                    key={_id}
                    _id={_id}
                    mainPhotoUrl={mainPhotoUrl}
                    section={section}
                    category={category}
                    description={description}
                    price={price}
                    nameProduct={nameProduct}
                    size={size}
                  />
                )
              )}
            </ul>
      </section>
    )
}

export default SellerWares;