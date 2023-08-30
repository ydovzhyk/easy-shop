import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getProductsFromOtherUser } from 'redux/product/product-operations';
import { selectProductsFromOtherUther } from 'redux/product/product-selectors';
import { getID } from 'redux/auth/auth-selectors';
import ProductItem from 'components/Shared/ProductItem/ProductItem';

import s from 'components/SellerInfo/SellerWares/SellerWares.module.scss';

const SellerWares = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userId = useSelector(getID);
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    dispatch( getProductsFromOtherUser(id));
  }, [dispatch, id, isLiked]);
    
  const sellerProducts = useSelector(selectProductsFromOtherUther);
  console.log('sellerProducts in Wares:', sellerProducts);

  const checkUserLike = productId => {
    const product = sellerProducts.find(item => item._id === productId);
    if (product) {
      return product.userLikes.includes(userId);
    }
    return false;
  };

  const handleLike = isLiked => {
    setIsLiked(isLiked);
  };

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
                  userLikes,
                }) => (
                  <ProductItem
                    key={_id}
                    _id={_id}
                    userId={userId}
                    mainPhotoUrl={mainPhotoUrl}
                    section={section}
                    category={category}
                    description={description}
                    price={price}
                    likes={userLikes.length ? userLikes.length : 0}
                    userLike={checkUserLike(_id)}
                    isLiked={isLiked}
                    handleLike={handleLike}
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