import Text from 'components/Shared/Text/Text';
import s from './ProductCard.module.scss';
import { nanoid } from '@reduxjs/toolkit';

const ProductSizes = ({ sizeValuesArray }) => {
  return (
    <div>
      <Text text="Розміри:" textClass="productLabels" />
      {sizeValuesArray.length > 1
        ? sizeValuesArray.map(item => {
            return (
              <div className={s.size} key={nanoid()}>
                <Text
                  text={`EU: ${item[0].EU} / UA: ${item[1].UA} / IN: ${item[2].IN}`}
                  textClass="after-title-bigger"
                />
              </div>
            );
          })
        : sizeValuesArray.map(item => {
            return (
              <div className={s.size} key={nanoid()}>
                <Text
                  text={
                    item[0].EU
                      ? `EU: ${item[0].EU} / UA: ${item[1].UA} / IN: ${item[2].IN}`
                      : `${Object.keys(item[0])} `
                  }
                  textClass="after-title-bigger"
                />
              </div>
            );
          })}
    </div>
  );
};

export default ProductSizes;
