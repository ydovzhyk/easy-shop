import { Link } from 'react-router-dom';
import Text from 'components/Shared/Text/Text';
import NoPhoto from 'images/catalog_photo/no_photo.jpg';
import s from './OrderProductsList.module.scss';

const OrderProductsList = ({ productsForOrder, products }) => {
  return (
    <ul>
      {productsForOrder &&
        productsForOrder.map(
          ({
            _id,
            nameProduct,
            mainPhotoUrl,
            brendName,
            price,
            size,
            sale,
            section,
            category,
          }) => {
            const sizesForProduct =
              products.find(item => item._id === _id)?.size || size;
            const transformedSize = sizesForProduct.map(item => item.name);
            const sizeQuantity = sizesForProduct.map(item => item.quantity);
            const changedPrice = sale ? (price * (100 - sale)) / 100 : price;
            const productsPrice =
              sizeQuantity.reduce(
                (prevValue, number) => prevValue + number,
                0
              ) * changedPrice;
            return (
              <li className={s.productItem} key={_id}>
                <div className={s.infoWraper}>
                  <div className={s.mainInfo}>
                    <Link to={`/product/${section}/${category}/${_id}`}>
                      <div className={s.thumb}>
                        <img
                          className={s.mainPhoto}
                          src={mainPhotoUrl}
                          onError={e => (e.target.src = NoPhoto)}
                          alt={nameProduct}
                        />
                      </div>
                    </Link>
                    <div className={s.description}>
                      <Text textClass="productText" text={brendName} />
                      <Link to={`/products/${section}/${category}/${_id}`}>
                        <Text textClass="productHeadings" text={nameProduct} />
                      </Link>
                      <div className={s.sizeQuantity}>
                        <div className={s.sizeQuantityWrapper}>
                          {transformedSize.map(size => (
                            <Text
                              key={size}
                              textClass="productText"
                              text={`Size: ${size}`}
                            />
                          ))}
                        </div>
                        <div className={s.sizeQuantityWrapper}>
                          {sizeQuantity.map((quantity, index) => (
                            <Text
                              key={index}
                              textClass="productText"
                              text={`Кількість: ${quantity}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={s.priceWrapper}>
                    <Text
                      textClass="productHeadings"
                      text={`Сума: ${productsPrice} грн.`}
                    />
                  </div>
                </div>
              </li>
            );
          }
        )}
    </ul>
  );
};

export default OrderProductsList;
