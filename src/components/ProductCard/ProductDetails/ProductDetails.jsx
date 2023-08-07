import Text from 'components/Shared/Text/Text';
import s from './ProductDetails.module.scss';
import DeliveryList from '../DeliveryList/DeliveryList';

const ProductDetails = ({ product }) => {
  const { brendName, condition, description, category: subSection } = product;
  return (
    <>
      <ul className={s.productInfo}>
        <li className={s.productDescription}>
          <Text text="Стан:" textClass="productLabels" />
          <Text text={condition} textClass="productText" />
        </li>
        <li className={s.productDescription}>
          <Text text="Бренд:" textClass="productLabels" />
          <Text text={brendName} textClass="productText" />
        </li>
        <li className={s.productDescription}>
          <Text text="Категорії:" textClass="productLabels" />
          <Text text={subSection} textClass="productText" />
        </li>
      </ul>
      <div className={s.productDetails}>
        <div className={s.productDescription}>
          <Text text="Опис товару:" textClass="productLabels" />
          <Text text={description} textClass="productTextDescription" />
        </div>
        <DeliveryList />
      </div>
    </>
  );
};

export default ProductDetails;
