import {  useSelector } from 'react-redux';
import { getID } from 'redux/auth/auth-selectors';

import Text from 'components/Shared/Text/Text';
import Button from 'components/Shared/Button/Button';
import SizeSelection from 'components/Shared/Sizes/SizeSelection/SizeSelection';
import { FiHeart } from 'react-icons/fi';
import { BiMessageDetail } from 'react-icons/bi';
import s from './ProductInfo.module.scss';

const ProductInfo = ({
  product,
  selectedSizesById,
  handleSelectedSizesChange,
  isUserProduct,
  handleBuyNowButtonClick,
  scrollToChating,
  isProductInBasket,
  setProductToBasket,
  handleLikesClick,
}) => {
  const userId = useSelector(getID);

  const { nameProduct, price, sale, size, userLikes } = product;

  // for sale
  const discountedPrice = sale ? (price * (100 - sale)) / 100 : price;

  const isProductInLike = userLikes && userLikes.includes(userId);

  return (
    <div className={s.productInfoWrapper}>
      <p className={s.availability}>В наявності</p>
      <Text text={nameProduct} textClass="productName" />
      {sale ? (
        <>
          <span className={s.productOldPrice}>{price}грн</span>
          <span className={s.productPriceDiscount}>-{sale}%</span>
          <Text text={`${discountedPrice} грн`} textClass="title" />
        </>
      ) : (
        <Text text={`${price} грн`} textClass="title" />
      )}
      {size && (
        <SizeSelection
          sizeOption={size}
          defaultSelectedSizes={selectedSizesById}
          onSelectedSizesChange={handleSelectedSizesChange}
        />
      )}
      {!isUserProduct && (
        <div className={s.buyBtns}>
          <Button
            type="button"
            btnClass="btnLight"
            text="Купити зараз"
            handleClick={handleBuyNowButtonClick}
          />
          <Button
            type="button"
            btnClass={!isProductInBasket ? 'btnLight' : 'btnDark'}
            text={isProductInBasket ? 'Товар у кошику' : 'Додати до кошика'}
            handleClick={setProductToBasket}
          />
        </div>
      )}

      <div className={s.additionalOptsContainer}>
        {!isUserProduct && (
          <div className={s.additionalOpts} onClick={handleLikesClick}>
            <FiHeart className={`${isProductInLike ? s.active : s.liked}`} />
            <Text
              text={isProductInLike ? 'Товар обраний' : 'Додати в обрані'}
              textClass="productText"
            />
          </div>
        )}

        {!isUserProduct && (
          <div className={s.additionalOpts}>
            <BiMessageDetail className={s.favoriteIcon} />
            <button onClick={scrollToChating}>
              <Text text="Поставити запитання" textClass="productText" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
