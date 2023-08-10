import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromOtherUser } from 'redux/product/product-operations';
import { selectProductsFromOtherUther } from 'redux/product/product-selectors';
const Wares = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch( getProductsFromOtherUser(id));
  }, [dispatch, id]);
    
  const sellerProducts = useSelector(selectProductsFromOtherUther);
  // console.log('sellerProducts in Wares:', sellerProducts);
  const productsNamesArray = sellerProducts.map(product =>{ return product.nameProduct});
  // console.log(productsNamesArray);
    return (
        <div>Товари продавця: {productsNamesArray.join(', ')} </div>
    )
}

export default Wares;