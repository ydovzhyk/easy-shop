import { useSelector } from 'react-redux';
import { selectProductById } from 'redux/product/product-selectors';
import PhotoCollection from 'components/Shared/PhotoCollection/PhotoCollection';
import s from './ProductPhotoContainer.module.scss';

const ProductPhotoContainer = () => {
  const product = useSelector(selectProductById);
  const { mainPhotoUrl, nameProduct, additionalPhotoUrl, vip, sale } = product;
  return (
    <div className={s.fotoContainer}>
      <div className={s.labelsContainer}>
        {vip === 'Так' && (
          <div className={s.vipLabel}>
            <span>Vip</span>
          </div>
        )}
        {sale && (
          <div className={s.vipLabel}>
            <span>{sale}%</span>
          </div>
        )}
      </div>

      <PhotoCollection
        mainPhotoUrl={mainPhotoUrl}
        nameProduct={nameProduct}
        additionalPhotoUrl={additionalPhotoUrl ? additionalPhotoUrl : []}
      />
    </div>
  );
};

export default ProductPhotoContainer;
